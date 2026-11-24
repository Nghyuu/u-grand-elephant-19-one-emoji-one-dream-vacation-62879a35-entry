// One Emoji, One Dream Vacation — "Mountain Dawn"
// Writes exactly one emoji to $MAKEFUN_OUTPUT_DIR/entry.txt: sunrise
// over mountains, the first light of a dream trip. Node stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🌄";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, EMOJI, "utf8");

// Self-check: the file must contain exactly one grapheme cluster and
// nothing else, so a bad write fails loudly instead of silently
// submitting an invalid entry.
const written = readFileSync(entryPath, "utf8");
const clusters = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(written)];
if (clusters.length !== 1 || written !== EMOJI) {
  throw new Error(`entry.txt must hold exactly one emoji, got ${JSON.stringify(written)}`);
}
