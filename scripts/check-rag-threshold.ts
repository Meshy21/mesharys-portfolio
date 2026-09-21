/**
 * Prints retrieval scores for questions that SHOULD be answerable next to ones
 * that should NOT, so the threshold can be set from evidence rather than taste.
 *
 *   npm run rag:check
 *
 * A healthy index shows a clear gap between the two groups. Put the threshold
 * in that gap and copy it into DEFAULT_THRESHOLD in src/lib/rag/retrieve.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createGeminiEmbedder, createHashEmbedder, HASH_EMBED_MODEL } from '../src/lib/rag/embed.ts';
import { retrieve, DEFAULT_THRESHOLD } from '../src/lib/rag/retrieve.ts';
import type { CorpusIndex } from '../src/lib/rag/types.ts';

const IN_CORPUS = [
  'What did he build at the Regional Trial Court?',
  'Tell me about the LearnMate project',
  'How did he deploy the wood knot detection model to mobile?',
  'What would he do differently on the payroll app?',
  'Which database does he use?',
  'What is his current role?',
  'How do I contact him?',
  'What does the n8n receipt workflow do?',
];

const OUT_OF_CORPUS = [
  'Does he have experience with Kubernetes at scale?',
  'What is his Rust experience?',
  'Has he worked in investment banking?',
  'What did he study for his PhD?',
  'Tell me about his time at Amazon',
  'What is the capital of France?',
  'Does he know Haskell?',
  'How many years of Salesforce experience does he have?',
];

function loadEnvLocal() {
  const p = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

async function main() {
  loadEnvLocal();
  const indexPath = path.join(process.cwd(), 'src/lib/rag/corpus-index.json');
  if (!fs.existsSync(indexPath)) {
    console.error('No index found. Run `npm run rag:index` first.');
    process.exit(1);
  }

  const index: CorpusIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const embed =
    index.model === HASH_EMBED_MODEL
      ? createHashEmbedder(index.dimensions)
      : createGeminiEmbedder(apiKey!);

  if (index.model !== HASH_EMBED_MODEL && !apiKey) {
    console.error('Index uses Gemini embeddings but GEMINI_API_KEY is not set.');
    process.exit(1);
  }

  console.log(`index: ${index.model}, ${index.chunks.length} chunks, ${index.dimensions}-d`);
  console.log(`current threshold: ${DEFAULT_THRESHOLD}\n`);

  const run = async (label: string, questions: string[]) => {
    console.log(label);
    const scores: number[] = [];
    for (const q of questions) {
      const r = await retrieve(q, index, embed, { threshold: DEFAULT_THRESHOLD });
      scores.push(r.topScore);
      const mark = r.grounded ? 'answers ' : 'REFUSES ';
      const best = r.matches[0]?.chunk.source ?? '—';
      console.log(`  ${r.topScore.toFixed(3)}  ${mark} ${q}`);
      console.log(`         ${best}`);
    }
    return scores;
  };

  const good = await run('SHOULD ANSWER', IN_CORPUS);
  console.log();
  const bad = await run('SHOULD REFUSE', OUT_OF_CORPUS);

  const minGood = Math.min(...good);
  const maxBad = Math.max(...bad);
  console.log('\n' + '-'.repeat(60));
  console.log(`lowest in-corpus score   ${minGood.toFixed(3)}`);
  console.log(`highest out-of-corpus    ${maxBad.toFixed(3)}`);

  if (minGood > maxBad) {
    const suggested = (minGood + maxBad) / 2;
    console.log(`separation               ${(minGood - maxBad).toFixed(3)}  (clean)`);
    console.log(`suggested threshold      ${suggested.toFixed(3)}`);
  } else {
    console.log('separation               OVERLAP — no threshold separates these cleanly.');
    console.log('Improve chunking or add corpus coverage before trusting the gate.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
