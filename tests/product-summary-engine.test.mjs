import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/lib/content-engine/product-summary.ts", import.meta.url),
  "utf8",
);

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const module = { exports: {} };
vm.runInNewContext(compiled, {
  module,
  exports: module.exports,
  URL,
  Set,
  Error,
});

const {
  generateSafeProductSummary,
  validateProductSummaryInput,
} = module.exports;

const validInput = {
  keyword: "รองเท้าวิ่งหน้าเท้ากว้าง",
  sourceTitle: "รองเท้าวิ่งรุ่นตัวอย่าง",
  sourceDescription:
    "พื้นรองเท้านุ่ม น้ำหนักเบา\nมีหลายขนาดให้เลือก\nควรตรวจสอบตารางไซซ์ก่อนสั่งซื้อ",
  sourceUrl: "https://shopee.co.th/example-i.1.2",
  affiliateUrl: "https://s.shopee.co.th/example",
  imageUrl: "https://example.com/image.jpg",
};

test("accepts Shopee Thailand source and affiliate URLs", () => {
  const value = validateProductSummaryInput(validInput);
  assert.equal(value.keyword, validInput.keyword);
});

test("rejects non-Shopee affiliate URLs", () => {
  assert.throws(
    () =>
      validateProductSummaryInput({
        ...validInput,
        affiliateUrl: "https://example.com/affiliate",
      }),
    /Shopee Thailand/,
  );
});

test("returns an unverified draft without price or rating fields", () => {
  const draft = generateSafeProductSummary(validInput);

  assert.equal(draft.contentStatus, "draft");
  assert.equal(draft.verificationStatus, "unverified");
  assert.equal("price" in draft, false);
  assert.equal("rating" in draft, false);
  assert.equal(draft.affiliateUrl, validInput.affiliateUrl);
});

test("handles missing descriptions without inventing highlights", () => {
  const draft = generateSafeProductSummary({
    ...validInput,
    sourceDescription: null,
  });

  assert.equal(draft.highlights.length, 0);
  assert.match(draft.summary, /ข้อมูลไม่เพียงพอ/);
});
