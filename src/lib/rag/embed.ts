import type { Embedder } from './types.ts';

/** Model used for the shipped index. Recorded in the index so retrieval can refuse a mismatch. */
export const GEMINI_EMBED_MODEL = 'text-embedding-004';
export const HASH_EMBED_MODEL = 'hash-bow-v1';

export function l2normalize(v: number[]): number[] {
  let sum = 0;
  for (const x of v) sum += x * x;
  const n = Math.sqrt(sum);
  return n === 0 ? v.slice() : v.map((x) => x / n);
}

/** Both vectors are L2-normalised, so the dot product is the cosine. */
export function cosine(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`dimension mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

/* -------------------------------------------------------------------------- */
/* Production embedder                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Gemini embeddings. Used by the index builder and by the chat route to embed
 * the incoming query — both sides must use the same model for scores to mean
 * anything, which is why the model name is written into the index.
 */
export function createGeminiEmbedder(apiKey: string): Embedder {
  return async (texts: string[]) => {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });
    const out: number[][] = [];

    // Batched to stay well inside per-request limits.
    const BATCH = 16;
    for (let i = 0; i < texts.length; i += BATCH) {
      const batch = texts.slice(i, i + BATCH);
      const res = await ai.models.embedContent({
        model: GEMINI_EMBED_MODEL,
        contents: batch,
      });
      const vectors = res.embeddings ?? [];
      if (vectors.length !== batch.length) {
        throw new Error(`expected ${batch.length} embeddings, got ${vectors.length}`);
      }
      for (const v of vectors) {
        const values = v.values;
        if (!values?.length) throw new Error('embedding came back empty');
        out.push(l2normalize(values));
      }
    }
    return out;
  };
}

/* -------------------------------------------------------------------------- */
/* Deterministic test double                                                  */
/* -------------------------------------------------------------------------- */

const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'for', 'with',
  'is', 'are', 'was', 'were', 'be', 'been', 'it', 'its', 'this', 'that', 'as',
  'at', 'by', 'from', 'he', 'his', 'him', 'you', 'your', 'i', 'me', 'my', 'we',
  'do', 'does', 'did', 'what', 'which', 'who', 'how', 'can', 'tell', 'about',
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

function hash(token: string, dims: number): number {
  let h = 2166136261;
  for (let i = 0; i < token.length; i++) {
    h ^= token.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % dims;
}

/**
 * Hashed bag-of-words embedder.
 *
 * NOT the product: this is lexical matching in vector form, with no semantic
 * understanding. It exists so the retrieval MECHANISM — scoring, top-k,
 * threshold gating, refusal — can be exercised deterministically in CI without
 * a network call or an API key. The shipped index uses Gemini embeddings.
 */
export function createHashEmbedder(dims = 256): Embedder {
  return async (texts: string[]) =>
    texts.map((text) => {
      const v = new Array<number>(dims).fill(0);
      const toks = tokens(text);
      for (const t of toks) {
        v[hash(t, dims)] += 1;
        // crude bigrams, so word order carries a little weight
        const stem = t.slice(0, 4);
        v[hash(`~${stem}`, dims)] += 0.5;
      }
      return l2normalize(v);
    });
}
