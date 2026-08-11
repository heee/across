// Offline OpenAI Batch corpus candidate pipeline.
//
// Curated corpus files are never modified. Only the explicitly confirmed
// `submit` command creates remote resources; every other command is read-only
// with respect to OpenAI.
//
// prepare:
//   node scripts/openai-corpus-batch.mjs prepare --model MODEL --categories "beer & brewing,whisky" --count 60 --requests-per-category 8 --out requests.jsonl
// import:
//   node scripts/openai-corpus-batch.mjs import --requests requests.jsonl --output downloaded-output.jsonl --errors downloaded-errors.jsonl --out candidates.json
// validate:
//   node scripts/openai-corpus-batch.mjs validate --file candidates.json
// promote:
//   node scripts/openai-corpus-batch.mjs promote --file candidates.json --out worker/corpus.llm.js
// submit / status / download:
//   node scripts/openai-corpus-batch.mjs submit --file requests.jsonl --receipt batch-receipt.json --confirm-submit
//   node scripts/openai-corpus-batch.mjs status --receipt batch-receipt.json
//   node scripts/openai-corpus-batch.mjs download --receipt batch-receipt.json --out batch-output.jsonl --errors-out batch-errors.jsonl

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WORD_BANK } from "../worker/corpus.js";

const DIFFICULTIES = new Set([1, 2, 3]);
const SCORE_VALUES = new Set([1, 2, 3, 4, 5]);
const WHISKY_COCKTAILS = new Set([
  "BOULEVARDIER", "HIGHBALL", "HOTTODDY", "MANHATTAN", "MINTJULEP",
  "OLD FASHIONED", "OLDFASHIONED", "PENICILLIN", "ROBROY", "SAZERAC",
  "WHISKEYSOUR", "WHISKYSOUR",
]);

export const CANDIDATE_SCHEMA = {
  type: "object",
  properties: {
    candidates: {
      type: "array",
      minItems: 1,
      maxItems: 100,
      items: {
        type: "object",
        properties: {
          answer: { type: "string", description: "Crossword answer; letters or a natural phrase that normalizes to 3-15 A-Z letters." },
          clue: { type: "string", description: "Original, self-contained crossword clue specific to this category sense." },
          difficulty: { type: "integer", enum: [1, 2, 3], description: "1 common/easy, 2 intermediate, 3 specialist." },
          relevance: { type: "integer", enum: [1, 2, 3, 4, 5], description: "How directly this exact answer and clue belong to the requested category." },
          commonness: { type: "integer", enum: [1, 2, 3, 4, 5], description: "How recognizable the answer is to a general English-speaking solver." },
          rationale: { type: "string", description: "Short factual audit note explaining category membership." },
        },
        required: ["answer", "clue", "difficulty", "relevance", "commonness", "rationale"],
        additionalProperties: false,
      },
    },
  },
  required: ["candidates"],
  additionalProperties: false,
};

function normalizeCategory(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeAnswer(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z]/g, "");
}

function categoryRules(category) {
  if (category === "whisky") {
    return [
      "Cover whiskies only: Scotch, Irish whiskey, bourbon, rye, Japanese, Canadian, and other world whiskies.",
      "Production, maturation, regions, styles, terminology, and tasting are in scope.",
      "Exclude every cocktail, mixed drink, cocktail ingredient, garnish, and cocktail technique.",
      "Do not propose an answer merely because whisky can be used in it.",
    ].join(" ");
  }
  return "Only propose answers whose exact clue sense is directly and unmistakably relevant to the category; generic crossing fill is out of scope.";
}

function requestPrompt(category, count, index) {
  return `Generate ${count} potential crossword answer-and-clue records for the category "${category}". This is expansion tranche ${index + 1}; seek a varied mix of answer lengths, initial letters, and subtopics instead of repeating only the most obvious terms. ${categoryRules(category)}
Answers must normalize to 3-15 A-Z letters. Use original factual clues, not copied published crossword clues. Avoid abbreviations, obscure variant spellings, proper nouns with uncertain spelling, duplicates, and answers already listed below. Score relevance and commonness honestly; relevance 5 means category-defining and 1 means merely adjacent. Native clue difficulty is 1-3.

Existing answers to avoid:
${WORD_BANK.filter((entry) => entry.cat === category).map((entry) => entry.w).sort().join(", ") || "(none)"}`;
}

export function buildBatchRequest({ category, count, model, index = 0 }) {
  category = normalizeCategory(category);
  if (!category) throw new Error("category is required");
  if (!model || !String(model).trim()) throw new Error("--model is required; the tool never chooses a model implicitly");
  if (!Number.isInteger(count) || count < 1 || count > 100) throw new Error("count must be an integer from 1 to 100");
  const slug = category.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  return {
    custom_id: `corpus-v1-${String(index + 1).padStart(4, "0")}-${slug}`,
    method: "POST",
    url: "/v1/responses",
    body: {
      model: String(model).trim(),
      store: false,
      metadata: { pipeline: "across-corpus-v1", category, tranche: String(index + 1) },
      input: [
        { role: "developer", content: "You are an editorial assistant proposing original crossword corpus candidates. Follow the category boundary exactly and return only the requested structured data." },
        { role: "user", content: requestPrompt(category, count, index) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "crossword_corpus_candidates",
          strict: true,
          schema: CANDIDATE_SCHEMA,
        },
      },
      max_output_tokens: 8000,
    },
  };
}

function parseJsonLines(text, label) {
  return String(text).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); }
    catch (error) { throw new Error(`${label} line ${index + 1} is invalid JSON: ${error.message}`); }
  });
}

function requireApiKey(apiKey) {
  if (!apiKey || !String(apiKey).trim()) throw new Error("OPENAI_API_KEY is required");
  return String(apiKey).trim();
}

async function apiJson(fetchImpl, apiKey, pathname, options = {}) {
  const response = await fetchImpl(`https://api.openai.com/v1${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${requireApiKey(apiKey)}`,
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); }
  catch { throw new Error(`OpenAI API ${pathname} returned HTTP ${response.status} with a non-JSON response`); }
  if (!response.ok) throw new Error(`OpenAI API ${pathname} failed: ${body?.error?.message || body?.error?.code || `HTTP ${response.status}`}`);
  return body;
}

function validatePreparedRequests(requestText) {
  const requests = parseJsonLines(requestText, "request");
  if (!requests.length) throw new Error("Batch request file is empty");
  const ids = new Set();
  for (const [index, request] of requests.entries()) {
    if (!request.custom_id || ids.has(request.custom_id)) throw new Error(`request line ${index + 1} has a missing or duplicate custom_id`);
    ids.add(request.custom_id);
    if (request.method !== "POST" || request.url !== "/v1/responses") throw new Error(`request line ${index + 1} must POST /v1/responses`);
    if (!request.body?.model || request.body?.text?.format?.strict !== true) throw new Error(`request line ${index + 1} is missing model or strict Structured Outputs`);
  }
  return requests;
}

export async function submitPreparedBatch({ requestText, filename = "corpus-requests.jsonl", apiKey, confirmed = false, fetchImpl = globalThis.fetch, now = new Date().toISOString() }) {
  if (!confirmed) throw new Error("Submission requires explicit --confirm-submit");
  requireApiKey(apiKey);
  const requests = validatePreparedRequests(requestText);
  const form = new FormData();
  form.set("purpose", "batch");
  form.set("file", new Blob([requestText], { type: "application/jsonl" }), path.basename(filename));
  const file = await apiJson(fetchImpl, apiKey, "/files", { method: "POST", body: form });
  if (!file?.id) throw new Error("OpenAI file upload response did not include an id");
  const batch = await apiJson(fetchImpl, apiKey, "/batches", {
    method: "POST",
    body: JSON.stringify({
      input_file_id: file.id,
      endpoint: "/v1/responses",
      completion_window: "24h",
      metadata: { pipeline: "across-corpus-v1", request_file: path.basename(filename).slice(0, 512) },
    }),
  });
  if (!batch?.id) throw new Error("OpenAI batch creation response did not include an id");
  return {
    version: 1,
    kind: "across-openai-batch-receipt",
    submittedAt: now,
    requestFile: {
      name: path.basename(filename),
      sha256: crypto.createHash("sha256").update(requestText).digest("hex"),
      bytes: Buffer.byteLength(requestText),
      requestCount: requests.length,
      openaiFileId: file.id,
    },
    batch: {
      id: batch.id,
      endpoint: batch.endpoint,
      status: batch.status,
      completionWindow: batch.completion_window,
      createdAt: batch.created_at,
      outputFileId: batch.output_file_id || null,
      errorFileId: batch.error_file_id || null,
    },
  };
}

export async function getBatchStatus({ batchId, apiKey, fetchImpl = globalThis.fetch }) {
  if (!batchId) throw new Error("batch id is required");
  const batch = await apiJson(fetchImpl, apiKey, `/batches/${encodeURIComponent(batchId)}`);
  return {
    id: batch.id,
    status: batch.status,
    endpoint: batch.endpoint,
    requestCounts: batch.request_counts || null,
    outputFileId: batch.output_file_id || null,
    errorFileId: batch.error_file_id || null,
    errors: batch.errors || null,
    completedAt: batch.completed_at || null,
    expiresAt: batch.expires_at || null,
  };
}

async function apiFileContent(fetchImpl, apiKey, fileId) {
  const pathname = `/files/${encodeURIComponent(fileId)}/content`;
  const response = await fetchImpl(`https://api.openai.com/v1${pathname}`, { headers: { Authorization: `Bearer ${requireApiKey(apiKey)}` } });
  const text = await response.text();
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try { message = JSON.parse(text)?.error?.message || message; } catch {}
    throw new Error(`OpenAI API ${pathname} failed: ${message}`);
  }
  return text;
}

export async function downloadBatchFiles({ batchId, apiKey, fetchImpl = globalThis.fetch }) {
  const status = await getBatchStatus({ batchId, apiKey, fetchImpl });
  if (!status.outputFileId && !status.errorFileId) throw new Error(`Batch ${batchId} has no downloadable files (status: ${status.status})`);
  const [output, errors] = await Promise.all([
    status.outputFileId ? apiFileContent(fetchImpl, apiKey, status.outputFileId) : null,
    status.errorFileId ? apiFileContent(fetchImpl, apiKey, status.errorFileId) : null,
  ]);
  return { status, output, errors };
}

function responseOutputText(responseBody) {
  for (const item of responseBody?.output || []) {
    if (item?.type !== "message") continue;
    for (const content of item.content || []) {
      if (content?.type === "output_text" && typeof content.text === "string") return content.text;
      if (content?.type === "refusal") throw new Error(`model refusal: ${content.refusal || "unspecified"}`);
    }
  }
  throw new Error("response has no output_text item");
}

function candidateProblems(candidate, category) {
  const problems = [];
  const answer = normalizeAnswer(candidate?.answer);
  if (!/^[A-Z]{3,15}$/.test(answer)) problems.push("answer_not_3_to_15_letters");
  if (typeof candidate?.clue !== "string" || candidate.clue.trim().length < 5 || candidate.clue.trim().length > 300) problems.push("invalid_clue");
  if (!DIFFICULTIES.has(candidate?.difficulty)) problems.push("invalid_difficulty");
  if (!SCORE_VALUES.has(candidate?.relevance)) problems.push("invalid_relevance");
  if (!SCORE_VALUES.has(candidate?.commonness)) problems.push("invalid_commonness");
  if (typeof candidate?.rationale !== "string" || candidate.rationale.trim().length < 3) problems.push("invalid_rationale");
  if (candidate?.relevance < 4) problems.push("relevance_below_4");
  if (candidate?.commonness < 2) problems.push("commonness_below_2");
  if (category === "whisky") {
    const joined = `${candidate.answer || ""} ${candidate.clue || ""} ${candidate.rationale || ""}`.toUpperCase();
    if (WHISKY_COCKTAILS.has(answer) || /\b(COCKTAIL|MIXED DRINK|GARNISH)S?\b/.test(joined)) problems.push("whisky_cocktail_excluded");
  }
  return { answer, problems };
}

function existingAnswerSet(category) {
  return new Set(WORD_BANK.filter((entry) => normalizeCategory(entry.cat) === category).map((entry) => normalizeAnswer(entry.w)));
}

export function importBatchOutput(requestText, outputText, now = new Date().toISOString()) {
  const requests = parseJsonLines(requestText, "request");
  const outputs = parseJsonLines(outputText, "output");
  const requestById = new Map(requests.map((request) => [request.custom_id, request]));
  if (requestById.size !== requests.length) throw new Error("request custom_id values must be unique");
  const seenOutputIds = new Set();
  const existingByCategory = new Map();
  const records = [];
  const requestAudit = [];

  for (const output of outputs) {
    const request = requestById.get(output.custom_id);
    if (!request) throw new Error(`output custom_id not found in requests: ${output.custom_id}`);
    if (seenOutputIds.has(output.custom_id)) throw new Error(`duplicate output custom_id: ${output.custom_id}`);
    seenOutputIds.add(output.custom_id);
    const category = normalizeCategory(request.body?.metadata?.category);
    if (!existingByCategory.has(category)) existingByCategory.set(category, existingAnswerSet(category));
    const existing = existingByCategory.get(category);
    const audit = {
      customId: output.custom_id,
      category,
      modelRequested: request.body?.model || null,
      responseId: output.response?.body?.id || null,
      requestId: output.response?.request_id || null,
      statusCode: output.response?.status_code || null,
      error: output.error || null,
    };
    requestAudit.push(audit);
    if (output.error || output.response?.status_code !== 200) continue;
    let parsed;
    try { parsed = JSON.parse(responseOutputText(output.response.body)); }
    catch (error) { audit.error = { code: "invalid_structured_output", message: error.message }; continue; }
    if (!Array.isArray(parsed.candidates)) { audit.error = { code: "missing_candidates", message: "Structured output has no candidates array." }; continue; }
    for (const candidate of parsed.candidates) {
      const { answer, problems } = candidateProblems(candidate, category);
      if (existing.has(answer)) problems.push("duplicate_existing_corpus");
      records.push({
        category,
        answer,
        proposedAnswer: String(candidate.answer || ""),
        clue: String(candidate.clue || "").trim(),
        difficulty: candidate.difficulty,
        relevance: candidate.relevance,
        commonness: candidate.commonness,
        rationale: String(candidate.rationale || "").trim(),
        disposition: problems.length ? "rejected" : "candidate",
        reasons: [...new Set(problems)],
        source: { customId: output.custom_id, responseId: audit.responseId, requestId: audit.requestId, model: audit.modelRequested },
      });
    }
  }
  for (const request of requests) {
    if (seenOutputIds.has(request.custom_id)) continue;
    requestAudit.push({
      customId: request.custom_id,
      category: normalizeCategory(request.body?.metadata?.category),
      modelRequested: request.body?.model || null,
      responseId: null,
      requestId: null,
      statusCode: null,
      error: { code: "missing_output", message: "No matching line was present in the supplied Batch output/error files." },
    });
  }

  // Keep the strongest novel proposal for an answer. Every displaced record
  // remains in the audit trail with an explicit duplicate reason.
  const novelByAnswer = new Map();
  for (const record of records.filter((item) => item.disposition === "candidate")) {
    const previous = novelByAnswer.get(record.answer);
    const score = record.relevance * 100 + record.commonness * 10 - record.difficulty;
    const previousScore = previous ? previous.relevance * 100 + previous.commonness * 10 - previous.difficulty : -1;
    if (!previous || score > previousScore) {
      if (previous) { previous.disposition = "rejected"; previous.reasons.push("duplicate_batch_candidate"); }
      novelByAnswer.set(record.answer, record);
    } else {
      record.disposition = "rejected";
      record.reasons.push("duplicate_batch_candidate");
    }
  }

  return {
    version: 1,
    kind: "across-corpus-candidates",
    createdAt: now,
    source: { endpoint: "/v1/responses", requestCount: requests.length, outputCount: outputs.length },
    requests: requestAudit,
    summary: {
      candidateCount: records.filter((record) => record.disposition === "candidate").length,
      rejectedCount: records.filter((record) => record.disposition === "rejected").length,
    },
    records,
  };
}

export function validateCandidateManifest(manifest) {
  const errors = [];
  if (manifest?.version !== 1 || manifest?.kind !== "across-corpus-candidates") errors.push("invalid manifest header");
  if (!Array.isArray(manifest?.requests) || !Array.isArray(manifest?.records)) errors.push("requests and records arrays are required");
  for (const [index, record] of (manifest?.records || []).entries()) {
    const { answer, problems } = candidateProblems(record, normalizeCategory(record.category));
    if (record.answer !== answer) problems.push("answer_not_normalized");
    if (!new Set(["candidate", "rejected"]).has(record.disposition)) problems.push("invalid_disposition");
    if (!Array.isArray(record.reasons)) problems.push("reasons_not_array");
    if (record.disposition === "candidate" && problems.length) errors.push(`record ${index}: ${problems.join(", ")}`);
    else if (record.disposition === "rejected" && Array.isArray(record.reasons)) {
      const missingReasons = problems.filter((problem) => !record.reasons.includes(problem));
      if (missingReasons.length) errors.push(`record ${index}: missing rejection reasons ${missingReasons.join(", ")}`);
    }
  }
  const actualCandidates = (manifest?.records || []).filter((record) => record.disposition === "candidate").length;
  const actualRejected = (manifest?.records || []).filter((record) => record.disposition === "rejected").length;
  if (manifest?.summary?.candidateCount !== actualCandidates || manifest?.summary?.rejectedCount !== actualRejected) errors.push("summary counts do not match records");
  return { ok: errors.length === 0, errors };
}

export function renderCorpusModule(manifest) {
  const validation = validateCandidateManifest(manifest);
  if (!validation.ok) throw new Error(`Candidate manifest is invalid:\n${validation.errors.join("\n")}`);
  const records = manifest.records
    .filter((record) => record.disposition === "candidate")
    .sort((a, b) => a.category.localeCompare(b.category) || a.answer.length - b.answer.length || a.answer.localeCompare(b.answer))
    .map((record) => ({ w: record.answer, c: record.clue, cat: record.category, diff: record.difficulty }));
  return `// AUTO-GENERATED — do not edit directly.\n// Source: screened OpenAI Batch candidates; see data/openai-corpus-candidates.summary.json.\n// The full local manifest retains request provenance and per-record rejection reasons.\n\nexport const LLM_WORD_BANK = ${JSON.stringify(records, null, 2)};\n`;
}

function option(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function writeFile(target, content) {
  fs.writeFileSync(path.resolve(target), content);
  console.log(`Wrote ${path.resolve(target)}.`);
}

function batchIdFromOptions() {
  const direct = option("batch-id");
  if (direct) return direct;
  const receiptFile = option("receipt");
  if (!receiptFile) throw new Error("Pass --batch-id or --receipt");
  const receipt = JSON.parse(fs.readFileSync(path.resolve(receiptFile), "utf8"));
  if (!receipt?.batch?.id) throw new Error("Receipt does not contain batch.id");
  return receipt.batch.id;
}

async function main() {
  const command = process.argv[2];
  if (command === "submit") {
    const file = option("file");
    const receiptFile = option("receipt");
    if (!file || !receiptFile) throw new Error("submit requires --file and --receipt");
    const receipt = await submitPreparedBatch({
      requestText: fs.readFileSync(path.resolve(file), "utf8"),
      filename: path.basename(file),
      apiKey: process.env.OPENAI_API_KEY,
      confirmed: process.argv.includes("--confirm-submit"),
    });
    writeFile(receiptFile, `${JSON.stringify(receipt, null, 2)}\n`);
    return;
  }
  if (command === "status") {
    const status = await getBatchStatus({ batchId: batchIdFromOptions(), apiKey: process.env.OPENAI_API_KEY });
    const out = option("out");
    if (out) writeFile(out, `${JSON.stringify(status, null, 2)}\n`);
    else console.log(JSON.stringify(status, null, 2));
    return;
  }
  if (command === "download") {
    const out = option("out");
    if (!out) throw new Error("download requires --out");
    const downloaded = await downloadBatchFiles({ batchId: batchIdFromOptions(), apiKey: process.env.OPENAI_API_KEY });
    if (downloaded.output != null) writeFile(out, downloaded.output);
    if (downloaded.errors != null) writeFile(option("errors-out", `${out}.errors.jsonl`), downloaded.errors);
    return;
  }
  if (command === "prepare") {
    const model = option("model");
    if (!model) throw new Error("prepare requires an explicit --model");
    const categories = [...new Set(option("categories").split(",").map(normalizeCategory).filter(Boolean))];
    const count = Number(option("count", "40"));
    const requestsPerCategory = Number(option("requests-per-category", "1"));
    const out = option("out");
    if (!categories.length || !out || !Number.isInteger(requestsPerCategory) || requestsPerCategory < 1 || requestsPerCategory > 100) {
      throw new Error("prepare requires --categories, --out, and requests-per-category from 1 to 100");
    }
    const requests = categories.flatMap((category) => Array.from({ length: requestsPerCategory }, () => category))
      .map((category, index) => buildBatchRequest({ category, count, model, index }));
    writeFile(out, `${requests.map((request) => JSON.stringify(request)).join("\n")}\n`);
    return;
  }
  if (command === "import") {
    const requestsFile = option("requests");
    const outputFile = option("output");
    const errorsFile = option("errors");
    const out = option("out");
    if (!requestsFile || !outputFile || !out) throw new Error("import requires --requests, --output, and --out");
    const downloaded = [
      fs.readFileSync(path.resolve(outputFile), "utf8"),
      errorsFile ? fs.readFileSync(path.resolve(errorsFile), "utf8") : "",
    ].filter(Boolean).join("\n");
    const manifest = importBatchOutput(fs.readFileSync(path.resolve(requestsFile), "utf8"), downloaded);
    const validation = validateCandidateManifest(manifest);
    if (!validation.ok) throw new Error(`Imported manifest is invalid:\n${validation.errors.join("\n")}`);
    writeFile(out, `${JSON.stringify(manifest, null, 2)}\n`);
    return;
  }
  if (command === "validate") {
    const file = option("file");
    if (!file) throw new Error("validate requires --file");
    const validation = validateCandidateManifest(JSON.parse(fs.readFileSync(path.resolve(file), "utf8")));
    if (!validation.ok) throw new Error(`Candidate manifest is invalid:\n${validation.errors.join("\n")}`);
    console.log("Candidate manifest is valid.");
    return;
  }
  if (command === "promote") {
    const file = option("file");
    const out = option("out");
    if (!file || !out) throw new Error("promote requires --file and --out");
    writeFile(out, renderCorpusModule(JSON.parse(fs.readFileSync(path.resolve(file), "utf8"))));
    return;
  }
  throw new Error("Use prepare, submit, status, download, import, validate, or promote.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
