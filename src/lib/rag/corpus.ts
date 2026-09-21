/**
 * Assembles the retrievable corpus from content that already lives in the repo.
 *
 * Uses node:fs, so this module is only imported by the index builder — never by
 * the chat route, which imports the prebuilt JSON index instead.
 */
import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../projects.ts';
import { experiences } from '../experience.ts';
import type { Chunk } from './types.ts';

const ROOT = process.cwd();

/** Each chunk carries its own heading so the embedding knows what it describes. */
function chunk(id: string, source: string, text: string, href?: string): Chunk {
  return { id, source, href, text: `${source}\n${text.trim()}` };
}

/** Split markdown on h2/h3 boundaries, then merge fragments that are too small. */
function splitMarkdown(md: string, maxWords = 260): string[] {
  const body = md.replace(/^---[\s\S]*?---/, '').replace(/```[\s\S]*?```/g, ' ');
  const sections = body.split(/\n(?=#{2,3}\s)/g);
  const out: string[] = [];

  for (const section of sections) {
    const words = section.trim().split(/\s+/);
    if (words.length < 12) continue;
    if (words.length <= maxWords) {
      out.push(section.trim());
      continue;
    }
    for (let i = 0; i < words.length; i += maxWords) {
      out.push(words.slice(i, i + maxWords).join(' '));
    }
  }
  return out;
}

function readIfPresent(rel: string): string | null {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : null;
}

export function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  /* Projects — one chunk per prose field, so a question about a trade-off
     retrieves the retrospective rather than the whole page. */
  for (const p of projects) {
    const href = `/projects/${p.slug}`;
    const fields: [string, string | undefined][] = [
      ['Overview', p.description],
      ['Details', p.longDescription],
      ['Challenges', p.challenges],
      ['Learnings', p.learnings],
      ['What I would do differently', p.retrospective],
    ];

    for (const [label, value] of fields) {
      if (!value) continue;
      chunks.push(
        chunk(`project:${p.slug}:${label}`, `Project: ${p.title} — ${label}`, value, href),
      );
    }

    const facts = [
      `Tech stack: ${p.tags.join(', ')}.`,
      p.github ? `Source code: ${p.github}.` : 'Source code is not public.',
      p.live ? `Live link: ${p.live}.` : null,
      p.metrics?.length
        ? `Key figures: ${p.metrics.map((m) => `${m.label} ${m.value}`).join('; ')}.`
        : null,
    ].filter(Boolean);

    chunks.push(chunk(`project:${p.slug}:facts`, `Project: ${p.title} — Stack and links`, facts.join(' '), href));
  }

  /* Work experience — one chunk per role. */
  for (const e of experiences) {
    const text = [
      `${e.title} at ${e.company}, ${e.location}. ${e.period}.`,
      e.isCurrent ? 'This is his current role.' : '',
      `Technologies: ${e.tags.join(', ')}.`,
      ...e.bullets,
    ]
      .filter(Boolean)
      .join(' ');
    chunks.push(chunk(`experience:${e.id}`, `Work experience: ${e.title}`, text, '/#experience'));
  }

  /* Skills and contact, from the shared data file. */
  const dataRaw = readIfPresent('src/lib/portfolio-data.json');
  if (dataRaw) {
    const data = JSON.parse(dataRaw);
    if (Array.isArray(data.skills) && data.skills.length) {
      const text = data.skills
        .map((s: { name: string; description: string }) => `${s.name}: ${s.description}.`)
        .join(' ');
      chunks.push(chunk('skills', 'Technical skills', text, '/#skills'));
    }
    if (data.contact) {
      const c = data.contact;
      chunks.push(
        chunk(
          'contact',
          'Contact and availability',
          `Location: ${c.location}. Email: ${c.email}. LinkedIn: ${c.linkedin}. ` +
            `GitHub: https://github.com/Meshy21. Resume: ${c.cvLink}.`,
          '/#contact',
        ),
      );
    }
    if (data.hero?.bio) {
      chunks.push(chunk('bio', 'About Meshary', `${data.hero.tagline}. ${data.hero.bio}`, '/'));
    }
  }

  /* Long-form markdown: repo README and the workflow write-ups. */
  const markdown: [string, string, string | undefined][] = [
    ['README.md', 'Portfolio repository README', undefined],
    [
      'public/workflows/n8n-gmail-email-pipeline-README.md',
      'n8n email pipeline documentation',
      '/projects/n8n-gmail-email-pipeline',
    ],
    [
      'public/workflows/n8n-telegram-receipt-engine-README.md',
      'n8n receipt engine documentation',
      '/projects/n8n-telegram-receipt-engine',
    ],
  ];

  for (const [rel, label, href] of markdown) {
    const raw = readIfPresent(rel);
    if (!raw) continue;
    splitMarkdown(raw).forEach((part, i) => {
      chunks.push(chunk(`md:${rel}:${i}`, `${label} (part ${i + 1})`, part, href));
    });
  }

  return chunks;
}
