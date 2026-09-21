import { HASH_EMBED_MODEL } from './embed.ts';
import type { CorpusIndex } from './types.ts';

/**
 * Is this index safe to gate live answers on?
 *
 * The hash embedder is lexical, so its similarity scores do not separate
 * in-corpus from out-of-corpus questions cleanly (run `npm run rag:check` to
 * see the overlap). Gating on it would either refuse everything or ground
 * answers on near-random chunks, so the chat route falls back to its
 * non-retrieval path until a real embedding index is present.
 */
export function isProductionIndex(index: CorpusIndex | null | undefined): boolean {
  if (!index || !Array.isArray(index.chunks) || index.chunks.length === 0) return false;
  return index.model !== HASH_EMBED_MODEL;
}
