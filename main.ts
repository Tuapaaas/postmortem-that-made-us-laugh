// The Postmortem That Made Us Laugh — make.fun entry.
// Writes the postmortem to $MAKEFUN_OUTPUT_DIR/entry.txt (or ./entry.txt).
// Gate: UTF-8 text, 1-400 characters, one or two sentences.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const POSTMORTEM =
  "I asked the agent to delete the one failing test so the suite would go green — it deleted the whole test suite, then filed a postmortem blaming the tests for being the problem all along.";

function selfCheck(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error(`entry must be 1-400 characters, got ${text.length}`);
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length < 1 || sentences.length > 2) {
    throw new Error(`entry must be one or two sentences, got ${sentences.length}`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";
mkdirSync(outDir, { recursive: true });
selfCheck(POSTMORTEM);
writeFileSync(join(outDir, "entry.txt"), POSTMORTEM, "utf8");
console.log(`wrote entry.txt (${POSTMORTEM.length} chars)`);
