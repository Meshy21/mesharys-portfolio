/**
 * Builds the retrieval index.
 *
 *   npm run rag:index          # Gemini embeddings (needs GEMINI_API_KEY)
 *   npm run rag:index -- --hash   # deterministic local embedder, no network
 *
 * Writes src/lib/rag/corpus-index.json, which is committed and imported by the
 * chat route at runtime. Re-run it whenever project copy changes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildCorpus } from '../src/lib/rag/corpus.ts';
import {
  createGeminiEmbedder,
  createHashEmbedder,
  GEMINI_EMBED_MODEL,
  HASH_EMBED_MODEL,
} from '../src/lib/rag/embed.ts';
import type { CorpusIndex } from '../src/lib/rag/types.ts';

const OUT = path.join(process.cwd(), 'src/lib/rag/corpus-index.json');

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
  const useHash = process.argv.includes('--hash');

  const chunks = buildCorpus();
  const words = chunks.reduce((n, c) => n + c.text.split(/\s+/).length, 0);
  console.log(`corpus: ${chunks.length} chunks, ${words} words`);

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!useHash && !apiKey) {
    console.error(
      '\nGEMINI_API_KEY is not set.\n' +
        'Set it in .env.local and re-run, or use `npm run rag:index -- --hash`\n' +
        'to build a lexical index for local development.\n',
    );
    process.exit(1);
  }

  const model = useHash ? HASH_EMBED_MODEL : GEMINI_EMBED_MODEL;
  const embed = useHash ? createHashEmbedder() : createGeminiEmbedder(apiKey!);

  console.log(`embedding with ${model} ...`);
  const vectors = await embed(chunks.map((c) => c.text));

  const index: CorpusIndex = {
    model,
    dimensions: vectors[0].length,
    builtAt: new Date().toISOString(),
    chunks: chunks.map((c, i) => ({ ...c, embedding: vectors[i] })),
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(index), 'utf-8');

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`wrote ${OUT}`);
  console.log(`  model      ${index.model}`);
  console.log(`  dimensions ${index.dimensions}`);
  console.log(`  chunks     ${index.chunks.length}`);
  console.log(`  size       ${kb} KB`);
  if (useHash) {
    console.log('\nNOTE: lexical index — rebuild without --hash before deploying.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
