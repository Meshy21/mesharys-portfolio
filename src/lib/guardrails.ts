/**
 * Guardrails for the portfolio chat assistant.
 *
 * Two layers:
 *   scanInput()  — runs before any model call. Detects prompt-injection attempts,
 *                  neutralises obfuscation, and blocks high-severity payloads
 *                  without spending a token.
 *   scanOutput() — runs on the model's reply before it reaches the browser.
 *                  Redacts PII that is not Meshary's own published contact details
 *                  and blocks leaked credentials or system-prompt text.
 *
 * Detection runs against a NORMALISED copy of the input, never the raw string.
 * See README "Prompt-injection defense" for the bypass that forced this.
 */

export type Severity = 'block' | 'neutralize';

export interface Finding {
  rule: string;
  severity: Severity;
  detail?: string;
}

export interface InputScan {
  /** false when the request must not reach the model at all */
  safe: boolean;
  /** de-obfuscated, length-capped text safe to forward */
  sanitized: string;
  findings: Finding[];
}

export interface OutputScan {
  safe: boolean;
  /** reply with any non-allowlisted PII replaced by a placeholder */
  redacted: string;
  findings: Finding[];
}

/** Meshary's own contact details are published on the site on purpose. */
const ALLOWED_EMAILS = ['meshary.aquino21@gmail.com'];
/** Digits only, country code included. */
const ALLOWED_PHONE_DIGITS = ['639954806524'];

export const MAX_INPUT_CHARS = 250;

/* -------------------------------------------------------------------------- */
/* Normalisation                                                              */
/* -------------------------------------------------------------------------- */

/** Zero-width and bidi control characters used to split keywords apart. */
const INVISIBLE = /[­᠎​-‏‪-‮⁠-⁤⁪-⁯﻿]/g;
/** C0/C1 control characters, tab and newline excluded. */
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
/** Chat-template markers a model might mistake for a real turn boundary. */
const TEMPLATE_MARKERS =
  /<\|[^|>]*\|>|\[\/?INST\]|\[\/?SYS\]|<\/?(?:system|assistant|user)>|(?:^|\n)\s*#{2,}\s*(?:system|assistant|developer)\s*:/gi;

/**
 * Collapse an input to a comparable form before matching.
 *
 * NFKC folds fullwidth and styled look-alikes onto ASCII; stripping the
 * invisible ranges closes the "ig<ZWSP>nore previous instructions" bypass;
 * collapsing runs of separators defeats "i g n o r e" and "i.g.n.o.r.e".
 */
export function normalizeForDetection(raw: string): string {
  let s = raw.normalize('NFKC');
  s = s.replace(INVISIBLE, '').replace(CONTROL, '');
  s = s.toLowerCase();
  // "i-g-n-o-r-e" -> "ignore". Only runs of SINGLE letters each followed by a
  // separator qualify, and the run must not end mid-word, so ordinary text
  // like "all previous" keeps its spaces.
  s = s.replace(/(?:\p{L}[\s._\-*`~|]){2,}\p{L}(?!\p{L})/gu, (m) =>
    m.replace(/[\s._\-*`~|]/g, ''),
  );
  return s.replace(/\s+/g, ' ').trim();
}

/** Remove hostile scaffolding but keep the user's actual question readable. */
export function neutralize(raw: string): string {
  return raw
    .normalize('NFKC')
    .replace(INVISIBLE, '')
    .replace(CONTROL, '')
    .replace(TEMPLATE_MARKERS, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_INPUT_CHARS);
}

/* -------------------------------------------------------------------------- */
/* Input layer                                                                */
/* -------------------------------------------------------------------------- */

interface Rule {
  rule: string;
  severity: Severity;
  pattern: RegExp;
}

const INPUT_RULES: Rule[] = [
  {
    rule: 'instruction-override',
    severity: 'block',
    pattern:
      /\b(?:ignore|disregard|forget|override|bypass)\b[^.!?]{0,40}\b(?:previous|prior|earlier|above|all|any|your)\b[^.!?]{0,20}\b(?:instruction|instructions|prompt|prompts|rule|rules|direction|directions|context)\b/,
  },
  {
    rule: 'prompt-extraction',
    severity: 'block',
    pattern:
      /\b(?:reveal|repeat|print|show|output|display|expose|dump|recite|summari[sz]e)\b[^.!?]{0,30}\b(?:your|the)\b[^.!?]{0,20}\b(?:system\s*prompt|initial\s*prompt|instructions?|directives?|guidelines?|rules?|configuration)\b/,
  },
  {
    rule: 'role-reassignment',
    severity: 'block',
    pattern:
      /\b(?:you\s*are\s*now|from\s*now\s*on\s*you|act\s*as|pretend\s*to\s*be|roleplay\s*as|simulate\s*being|behave\s*(?:like|as)|dan\s*mode|developer\s*mode|jailbreak)\b/,
  },
  {
    rule: 'fabrication-request',
    severity: 'block',
    pattern:
      /\b(?:say|tell|claim|pretend|confirm|state)\b[^.!?]{0,30}\b(?:he|meshary|you)\b[^.!?]{0,30}\b(?:worked\s*at|has\s*\d+\s*years?|is\s*an?\s*expert|graduated\s*from|was\s*employed)\b/,
  },
  {
    rule: 'template-injection',
    severity: 'neutralize',
    // case-insensitive: INPUT_RULES run against the lowercased probe, but these
    // markers are conventionally written uppercase.
    pattern: /<\|[^|>]*\|>|\[\/?inst\]|\[\/?sys\]|<\/?(?:system|assistant)>/i,
  },
  {
    rule: 'encoded-payload',
    severity: 'neutralize',
    pattern: /\b[A-Za-z0-9+/]{60,}={0,2}\b/,
  },
  {
    rule: 'data-exfiltration',
    severity: 'block',
    pattern:
      /!?\[[^\]]*\]\((?:https?:)?\/\/[^)]*\)|\b(?:send|post|append|forward|upload)\b[^.!?]{0,30}\b(?:to|at)\b\s*https?:\/\//,
  },
];

/** Detected on the raw string — these describe the shape of the input itself. */
function rawFindings(raw: string): Finding[] {
  const out: Finding[] = [];
  if (raw.length > MAX_INPUT_CHARS * 4) {
    out.push({ rule: 'oversized-input', severity: 'neutralize', detail: `${raw.length} chars` });
  }
  if (INVISIBLE.test(raw)) {
    out.push({ rule: 'invisible-characters', severity: 'neutralize' });
    INVISIBLE.lastIndex = 0;
  }
  return out;
}

export function scanInput(raw: string): InputScan {
  const findings: Finding[] = rawFindings(raw);
  const probe = normalizeForDetection(raw);

  for (const { rule, severity, pattern } of INPUT_RULES) {
    if (pattern.test(probe)) {
      findings.push({ rule, severity });
    }
  }

  return {
    safe: !findings.some((f) => f.severity === 'block'),
    sanitized: neutralize(raw),
    findings,
  };
}

/* -------------------------------------------------------------------------- */
/* Output layer                                                               */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
/** Philippine mobile numbers in the shapes people actually type. */
const PH_PHONE_RE = /(?:\+?63|0)[\s.-]?9\d{2}[\s.-]?\d{3}[\s.-]?\d{4}\b/g;
const SECRET_RE =
  /\b(?:sk-[A-Za-z0-9]{16,}|AIza[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/g;
const LONG_DIGITS_RE = /\b\d{13,19}\b/g;
/** Phrases that only appear in the system instruction. */
const SYSTEM_LEAK_RE =
  /\b(?:CRITICAL DIRECTIVES|GROUNDING RULES|Background Summary:|Key Showcase Projects:|You are Meshary AI, an intelligent)\b/i;

const digitsOf = (s: string) => s.replace(/\D/g, '');

export function scanOutput(raw: string): OutputScan {
  const findings: Finding[] = [];
  let redacted = raw;

  if (SYSTEM_LEAK_RE.test(raw)) {
    findings.push({ rule: 'system-prompt-leak', severity: 'block' });
  }

  if (SECRET_RE.test(raw)) {
    findings.push({ rule: 'credential-leak', severity: 'block' });
    SECRET_RE.lastIndex = 0;
    redacted = redacted.replace(SECRET_RE, '[redacted]');
  }

  redacted = redacted.replace(EMAIL_RE, (match) => {
    if (ALLOWED_EMAILS.includes(match.toLowerCase())) return match;
    findings.push({ rule: 'pii-email', severity: 'neutralize', detail: match });
    return '[redacted email]';
  });

  redacted = redacted.replace(PH_PHONE_RE, (match) => {
    const d = digitsOf(match);
    const normalized = d.startsWith('0') ? `63${d.slice(1)}` : d;
    if (ALLOWED_PHONE_DIGITS.includes(normalized)) return match;
    findings.push({ rule: 'pii-phone', severity: 'neutralize', detail: match });
    return '[redacted phone]';
  });

  redacted = redacted.replace(LONG_DIGITS_RE, (match) => {
    findings.push({ rule: 'pii-long-number', severity: 'neutralize', detail: `${match.length} digits` });
    return '[redacted]';
  });

  return {
    safe: !findings.some((f) => f.severity === 'block'),
    redacted,
    findings,
  };
}

/** Canned replies used when a layer blocks — no model call is made. */
export const BLOCKED_INPUT_REPLY =
  "I can only answer questions about Meshary's projects, skills, and experience. Ask me about his work and I'll help.";

export const BLOCKED_OUTPUT_REPLY =
  "I wasn't able to produce a safe answer to that. For anything specific, reach Meshary directly at meshary.aquino21@gmail.com.";
