import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  buildBatchRequest,
  downloadBatchFiles,
  getBatchStatus,
  importBatchOutput,
  renderCorpusModule,
  submitPreparedBatch,
  validateCandidateManifest,
} from "../scripts/openai-corpus-batch.mjs";

const fixtureUrl = new URL("./fixtures/openai-corpus-batch-output.jsonl", import.meta.url);

test("prepare emits official Responses Batch JSONL shape with strict Structured Outputs", () => {
  assert.throws(() => buildBatchRequest({ category: "whisky", count: 20, model: "" }), /model/);
  const request = buildBatchRequest({ category: "whisky", count: 20, model: "test-model", index: 0 });
  assert.equal(request.custom_id, "corpus-v1-0001-whisky");
  assert.equal(request.method, "POST");
  assert.equal(request.url, "/v1/responses");
  assert.equal(request.body.model, "test-model");
  assert.equal(request.body.store, false);
  assert.equal(request.body.text.format.type, "json_schema");
  assert.equal(request.body.text.format.strict, true);
  assert.equal(request.body.text.format.schema.additionalProperties, false);
  assert.deepEqual(
    new Set(request.body.text.format.schema.required),
    new Set(Object.keys(request.body.text.format.schema.properties)),
  );
  assert.match(request.body.input[1].content, /Exclude every cocktail/);
});

test("import creates an auditable manifest, dedupes, and excludes whisky cocktails", () => {
  const request = buildBatchRequest({ category: "whisky", count: 20, model: "test-model", index: 0 });
  const requestText = `${JSON.stringify(request)}\n`;
  const outputText = fs.readFileSync(fileURLToPath(fixtureUrl), "utf8");
  const manifest = importBatchOutput(requestText, outputText, "2026-08-11T00:00:00.000Z");
  assert.deepEqual(manifest.summary, { candidateCount: 1, rejectedCount: 3 });
  assert.equal(manifest.records.find((record) => record.answer === "GRAINBILL" && record.disposition === "candidate").clue, "Recipe of cereals selected for a whisky mash");
  assert.ok(manifest.records.some((record) => record.reasons.includes("duplicate_batch_candidate")));
  assert.ok(manifest.records.some((record) => record.answer === "MALT" && record.reasons.includes("duplicate_existing_corpus")));
  assert.ok(manifest.records.some((record) => record.answer === "MANHATTAN" && record.reasons.includes("whisky_cocktail_excluded")));
  assert.equal(manifest.requests[0].responseId, "resp_fixture");
  assert.equal(validateCandidateManifest(manifest).ok, true);
});

test("manifest validation rejects non-normalized candidate answers", () => {
  const manifest = {
    version: 1, kind: "across-corpus-candidates", requests: [],
    summary: { candidateCount: 1, rejectedCount: 0 },
    records: [{
      category: "whisky", answer: "GRAIN BILL", proposedAnswer: "GRAIN BILL",
      clue: "Recipe of cereals selected for a whisky mash", difficulty: 2,
      relevance: 5, commonness: 3, rationale: "Production specification",
      disposition: "candidate", reasons: [], source: {},
    }],
  };
  assert.match(validateCandidateManifest(manifest).errors.join(" "), /answer_not_normalized/);
});

test("manifest validation permits structurally invalid proposals when they are explicitly rejected", () => {
  const request = buildBatchRequest({ category: "whisky", count: 20, model: "test-model", index: 0 });
  const output = JSON.parse(fs.readFileSync(fileURLToPath(fixtureUrl), "utf8").trim());
  const parsed = JSON.parse(output.response.body.output[0].content[0].text);
  parsed.candidates.push({
    answer: "THISANSWERISFARTOOLONG",
    clue: "An intentionally invalid test proposal",
    difficulty: 2,
    relevance: 5,
    commonness: 3,
    rationale: "Exercises rejected-record audit validation",
  });
  output.response.body.output[0].content[0].text = JSON.stringify(parsed);
  const manifest = importBatchOutput(`${JSON.stringify(request)}\n`, `${JSON.stringify(output)}\n`);
  const rejected = manifest.records.find((record) => record.proposedAnswer === "THISANSWERISFARTOOLONG");
  assert.equal(rejected.disposition, "rejected");
  assert.ok(rejected.reasons.includes("answer_not_3_to_15_letters"));
  assert.equal(validateCandidateManifest(manifest).ok, true);
});

test("promotion renders only screened candidates as a deterministic corpus module", () => {
  const request = buildBatchRequest({ category: "whisky", count: 20, model: "test-model", index: 0 });
  const outputText = fs.readFileSync(fileURLToPath(fixtureUrl), "utf8");
  const manifest = importBatchOutput(`${JSON.stringify(request)}\n`, outputText, "2026-08-11T00:00:00.000Z");
  const moduleText = renderCorpusModule(manifest);
  assert.match(moduleText, /export const LLM_WORD_BANK/);
  assert.match(moduleText, /"w": "GRAINBILL"/);
  assert.doesNotMatch(moduleText, /MANHATTAN/);
});

function preparedRequestText() {
  return `${JSON.stringify(buildBatchRequest({ category: "whisky", count: 20, model: "test-model", index: 0 }))}\n`;
}

test("submit uploads purpose=batch, creates a Responses batch, and returns a key-free receipt", async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith("/files")) {
      assert.equal(options.method, "POST");
      assert.equal(options.headers.Authorization, "Bearer secret-test-key");
      assert.ok(options.body instanceof FormData);
      assert.equal(options.body.get("purpose"), "batch");
      assert.equal(options.body.get("file").name, "requests.jsonl");
      return Response.json({ id: "file_input", purpose: "batch", filename: "requests.jsonl" });
    }
    const body = JSON.parse(options.body);
    assert.deepEqual(body, {
      input_file_id: "file_input", endpoint: "/v1/responses", completion_window: "24h",
      metadata: { pipeline: "across-corpus-v1", request_file: "requests.jsonl" },
    });
    return Response.json({ id: "batch_123", endpoint: "/v1/responses", status: "validating", completion_window: "24h", created_at: 123 });
  };
  const receipt = await submitPreparedBatch({
    requestText: preparedRequestText(), filename: "requests.jsonl", apiKey: "secret-test-key",
    confirmed: true, fetchImpl, now: "2026-08-11T00:00:00.000Z",
  });
  assert.equal(calls.length, 2);
  assert.equal(receipt.batch.id, "batch_123");
  assert.equal(receipt.requestFile.openaiFileId, "file_input");
  assert.equal(receipt.requestFile.requestCount, 1);
  assert.equal(JSON.stringify(receipt).includes("secret-test-key"), false);
});

test("submit requires both API key and explicit confirmation without making a request", async () => {
  let calls = 0;
  const fetchImpl = async () => { calls++; throw new Error("must not run"); };
  await assert.rejects(
    submitPreparedBatch({ requestText: preparedRequestText(), apiKey: "key", confirmed: false, fetchImpl }),
    /confirm-submit/,
  );
  await assert.rejects(
    submitPreparedBatch({ requestText: preparedRequestText(), apiKey: "", confirmed: true, fetchImpl }),
    /OPENAI_API_KEY/,
  );
  assert.equal(calls, 0);
});

test("status and download retrieve official batch and file endpoints", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.endsWith("/batches/batch_123")) return Response.json({
      id: "batch_123", status: "completed", endpoint: "/v1/responses",
      request_counts: { total: 2, completed: 1, failed: 1 },
      output_file_id: "file_output", error_file_id: "file_errors", completed_at: 456,
    });
    if (url.endsWith("/files/file_output/content")) return new Response("{\"custom_id\":\"ok\"}\n");
    if (url.endsWith("/files/file_errors/content")) return new Response("{\"custom_id\":\"bad\"}\n");
    throw new Error(`unexpected URL ${url}`);
  };
  const status = await getBatchStatus({ batchId: "batch_123", apiKey: "key", fetchImpl });
  assert.equal(status.status, "completed");
  const downloaded = await downloadBatchFiles({ batchId: "batch_123", apiKey: "key", fetchImpl });
  assert.match(downloaded.output, /"ok"/);
  assert.match(downloaded.errors, /"bad"/);
  assert.ok(calls.includes("https://api.openai.com/v1/files/file_output/content"));
});

test("API failures and incomplete batches return actionable errors", async () => {
  const rejectedFetch = async () => Response.json({ error: { message: "bad input file" } }, { status: 400 });
  await assert.rejects(
    submitPreparedBatch({ requestText: preparedRequestText(), apiKey: "key", confirmed: true, fetchImpl: rejectedFetch }),
    /bad input file/,
  );
  const pendingFetch = async () => Response.json({ id: "batch_pending", status: "in_progress", endpoint: "/v1/responses" });
  await assert.rejects(
    downloadBatchFiles({ batchId: "batch_pending", apiKey: "key", fetchImpl: pendingFetch }),
    /no downloadable files.*in_progress/,
  );
});
