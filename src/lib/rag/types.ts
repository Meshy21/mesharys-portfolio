/** A retrievable unit of the corpus. */
export interface Chunk {
  id: string;
  /** Human-readable provenance, e.g. "Project: LearnMate — Challenges". */
  source: string;
  /** Where a reader can verify this, e.g. "/projects/learnmate". */
  href?: string;
  text: string;
}

export interface IndexedChunk extends Chunk {
  embedding: number[];
}

export interface CorpusIndex {
  /** Model that produced the vectors. Retrieval refuses to mix models. */
  model: string;
  dimensions: number;
  builtAt: string;
  chunks: IndexedChunk[];
}

export interface Match {
  chunk: Chunk;
  score: number;
}

export interface RetrievalResult {
  /** false when nothing cleared the threshold — the caller must refuse. */
  grounded: boolean;
  matches: Match[];
  /** Best score seen, whether or not it cleared the threshold. */
  topScore: number;
  threshold: number;
}

/** Turns text into a vector. Implementations must be L2-normalised. */
export type Embedder = (texts: string[]) => Promise<number[][]>;
