/**
 * Retrieval-gating tests.
 *
 * These exercise the MECHANISM — scoring, ordering, the threshold gate, and the
 * refusal path — against a small synthetic index built with the deterministic
 * hash embedder. No network, no API key, same result on every machine.
 *
 * Semantic quality is a property of the embedding model and is verified
 * separately with `npm run rag:check` once a Gemini index exists.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { createHashEmbedder, cosine, l2normalize, HASH_EMBED_MODEL } from './embed.ts';
import {
  retrieve,
  buildContextBlock,
  UNGROUNDED_REPLY,
  DEFAULT_THRESHOLD,
} from './retrieve.ts';
import { isProductionIndex } from './index-guard.ts';
import type { CorpusIndex, Chunk } from './types.ts';

const DIMS = 256;
const embed = createHashEmbedder(DIMS);

const DOCS: Chunk[] = [
  {
    id: 'payroll',
    source: 'Project: Payroll — Details',
    text: 'Project Payroll. Enterprise payroll web application computing BIR withholding tax, SSS contributions and PhilHealth premiums with Fernet encryption.',
  },
  {
    id: 'learnmate',
    source: 'Project: LearnMate — Details',
    text: 'Project LearnMate. Android tutoring application with session booking, in-app messaging and Agora video conferencing built in Flutter.',
  },
  {
    id: 'woodknot',
    source: 'Project: Wood Knot — Details',
    text: 'Project Wood Knot. On-device detector identifying wood knots with YOLOv8 exported through ONNX to quantized TensorFlow Lite.',
  },
];

async function buildIndex(): Promise<CorpusIndex> {
  const vectors = await embed(DOCS.map((d) => d.text));
  return {
    model: HASH_EMBED_MODEL,
    dimensions: DIMS,
    builtAt: new Date().toISOString(),
    chunks: DOCS.map((d, i) => ({ ...d, embedding: vectors[i] })),
  };
}

describe('vector maths', () => {
  test('l2normalize produces unit vectors', () => {
    const v = l2normalize([3, 4]);
    assert.ok(Math.abs(Math.hypot(...v) - 1) < 1e-9);
  });

  test('cosine of identical vectors is 1', () => {
    const v = l2normalize([1, 2, 3]);
    assert.ok(Math.abs(cosine(v, v) - 1) < 1e-9);
  });

  test('cosine of orthogonal vectors is 0', () => {
    assert.equal(cosine([1, 0], [0, 1]), 0);
  });

  test('dimension mismatch throws rather than scoring nonsense', () => {
    assert.throws(() => cosine([1, 0], [1, 0, 0]), /dimension mismatch/);
  });
});

describe('retrieval ranking', () => {
  test('the most relevant chunk ranks first', async () => {
    const index = await buildIndex();
    const r = await retrieve('Tell me about YOLOv8 and TensorFlow Lite', index, embed, {
      threshold: 0,
    });
    assert.equal(r.matches[0].chunk.id, 'woodknot');
  });

  test('a different question retrieves a different chunk', async () => {
    const index = await buildIndex();
    const r = await retrieve('Agora video conferencing tutoring', index, embed, { threshold: 0 });
    assert.equal(r.matches[0].chunk.id, 'learnmate');
  });

  test('topK caps how many chunks come back', async () => {
    const index = await buildIndex();
    const r = await retrieve('payroll tax', index, embed, { threshold: 0, topK: 2 });
    assert.equal(r.matches.length, 2);
  });

  test('scores come back in descending order', async () => {
    const index = await buildIndex();
    const r = await retrieve('payroll tax SSS PhilHealth', index, embed, { threshold: 0 });
    for (let i = 1; i < r.matches.length; i++) {
      assert.ok(r.matches[i - 1].score >= r.matches[i].score);
    }
  });
});

describe('threshold gate — the refusal path', () => {
  test('an in-corpus question clears a threshold it should clear', async () => {
    const index = await buildIndex();
    const r = await retrieve('BIR withholding tax and SSS contributions', index, embed, {
      threshold: 0.2,
    });
    assert.equal(r.grounded, true);
    assert.equal(r.matches[0].chunk.id, 'payroll');
  });

  test('an out-of-corpus question is refused', async () => {
    const index = await buildIndex();
    // nothing in the corpus mentions Kubernetes, Rust or investment banking
    for (const q of [
      'Does he have Kubernetes experience?',
      'What is his Rust background?',
      'Has he worked in investment banking?',
    ]) {
      const r = await retrieve(q, index, embed, { threshold: 0.2 });
      assert.equal(r.grounded, false, `"${q}" was wrongly treated as grounded`);
      assert.equal(r.matches.length, 0);
    }
  });

  test('an ungrounded result still reports the best score it saw', async () => {
    const index = await buildIndex();
    const r = await retrieve('Kubernetes autoscaling', index, embed, { threshold: 0.99 });
    assert.equal(r.grounded, false);
    assert.ok(r.topScore >= 0 && r.topScore < 0.99);
    assert.equal(r.threshold, 0.99);
  });

  test('raising the threshold turns a grounded answer into a refusal', async () => {
    const index = await buildIndex();
    const q = 'BIR withholding tax and SSS contributions';
    assert.equal((await retrieve(q, index, embed, { threshold: 0.2 })).grounded, true);
    assert.equal((await retrieve(q, index, embed, { threshold: 0.99 })).grounded, false);
  });

  test('empty query and empty index both refuse', async () => {
    const index = await buildIndex();
    assert.equal((await retrieve('   ', index, embed)).grounded, false);
    const empty: CorpusIndex = { ...index, chunks: [] };
    assert.equal((await retrieve('payroll', empty, embed)).grounded, false);
  });

  test('a query embedded at the wrong dimensionality throws, not silently scores', async () => {
    const index = await buildIndex();
    await assert.rejects(
      () => retrieve('payroll', index, createHashEmbedder(64)),
      /Rebuild the index with the same embedder/,
    );
  });
});

describe('context assembly', () => {
  test('the context block carries provenance for every chunk', async () => {
    const index = await buildIndex();
    const r = await retrieve('payroll tax', index, embed, { threshold: 0, topK: 2 });
    const block = buildContextBlock(r.matches);
    assert.match(block, /\[1\] Project:/);
    assert.match(block, /\[2\] Project:/);
    for (const m of r.matches) assert.ok(block.includes(m.chunk.text));
  });

  test('the refusal message offers a real next step', () => {
    assert.match(UNGROUNDED_REPLY, /meshary\.aquino21@gmail\.com/);
    assert.ok(!/I think|probably|likely|might have/i.test(UNGROUNDED_REPLY));
  });

  test('the default threshold is a sane cosine value', () => {
    assert.ok(DEFAULT_THRESHOLD > 0 && DEFAULT_THRESHOLD < 1);
  });
});

describe('production index guard', () => {
  test('a lexical dev index is not accepted as production', async () => {
    const index = await buildIndex();
    assert.equal(isProductionIndex(index), false);
  });

  test('a Gemini-embedded index is accepted', async () => {
    const index = await buildIndex();
    assert.equal(isProductionIndex({ ...index, model: 'text-embedding-004' }), true);
  });

  test('an empty index is never production-ready', async () => {
    const index = await buildIndex();
    assert.equal(isProductionIndex({ ...index, model: 'text-embedding-004', chunks: [] }), false);
  });

  /**
   * Marked todo: the committed index is currently the lexical dev build, so the
   * chat route falls back to prompt grounding and retrieval is inactive.
   * Run `npm run rag:index` with GEMINI_API_KEY set, commit the result, then
   * drop the todo flag to make CI enforce that a real index ships.
   */
  test('the committed index is a production embedding index', { todo: true }, async () => {
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const p = fileURLToPath(new URL('./corpus-index.json', import.meta.url));
    const committed: CorpusIndex = JSON.parse(readFileSync(p, 'utf-8'));
    assert.equal(
      isProductionIndex(committed),
      true,
      `committed index uses "${committed.model}" — rebuild it with Gemini embeddings`,
    );
  });
});
