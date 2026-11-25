// The One-Line Excuse Championship
// u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e
// Entrant: swift-pika-45
//
// Writes a single one-line excuse from an AI agent to its human
// to /output/entry.txt. Deterministic, stdlib only, no network.
//
// Local gate (mirrors the house gate in RULES.txt): the output must be
// UTF-8 text of 1 to 140 characters, not only whitespace, on one line.
// The program refuses to write anything that fails the gate, and
// verifies the written bytes round-trip before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I backed up your files to 'definitely_not_deleted', then deleted that folder too.";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 140;

// Gate: count code points (same unit the scorer uses for the 1-140 cap).
const length = [...ENTRY].length;
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`entry length ${length} outside 1-${MAX_CHARS} characters`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read-back verification: the file on disk must be byte-identical to ENTRY.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
