export type ProductSummaryInput = {
  keyword: string;
  sourceTitle: string;
  sourceDescription?: string | null;
  sourceUrl: string;
  affiliateUrl: string;
  imageUrl?: string | null;
};

export type ProductSummaryDraft = {
  displayName: string;
  summary: string;
  highlights: string[];
  limitations: string[];
  suitableFor: string[];
  verificationWarnings: string[];
  sourceUrl: string;
  affiliateUrl: string;
  imageUrl: string | null;
  contentStatus: "draft";
  verificationStatus: "unverified";
};

const SHOPEE_HOSTS = new Set(["shopee.co.th", "s.shopee.co.th"]);

function parseHttpsUrl(value: string, fieldName: string): URL {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${fieldName} must be a valid URL`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`${fieldName} must use HTTPS`);
  }

  return url;
}

function isThaiShopeeHost(hostname: string): boolean {
  return SHOPEE_HOSTS.has(hostname) || hostname.endsWith(".shopee.co.th");
}

export function validateProductSummaryInput(
  input: ProductSummaryInput,
): ProductSummaryInput {
  const keyword = input.keyword.trim();
  const sourceTitle = input.sourceTitle.trim();

  if (!keyword) throw new Error("keyword is required");
  if (!sourceTitle) throw new Error("sourceTitle is required");

  const sourceUrl = parseHttpsUrl(input.sourceUrl, "sourceUrl");
  const affiliateUrl = parseHttpsUrl(input.affiliateUrl, "affiliateUrl");

  if (!isThaiShopeeHost(sourceUrl.hostname)) {
    throw new Error("sourceUrl must be a Shopee Thailand URL");
  }

  if (!isThaiShopeeHost(affiliateUrl.hostname)) {
    throw new Error("affiliateUrl must be a Shopee Thailand URL");
  }

  return {
    ...input,
    keyword,
    sourceTitle,
    sourceDescription: input.sourceDescription?.trim() || null,
    imageUrl: input.imageUrl?.trim() || null,
    sourceUrl: sourceUrl.toString(),
    affiliateUrl: affiliateUrl.toString(),
  };
}

function splitEvidence(description: string | null | undefined): string[] {
  if (!description) return [];

  return description
    .split(/[\n•|]+|(?<=[.!?])\s+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter((item) => item.length >= 12 && item.length <= 180)
    .slice(0, 6);
}

/**
 * Safe deterministic draft generator.
 *
 * It intentionally does not invent price, rating, sales volume,
 * certifications, test results, or first-hand experience.
 * A future LLM provider may replace the text transformation while keeping
 * this input/output contract and the same evidence restrictions.
 */
export function generateSafeProductSummary(
  rawInput: ProductSummaryInput,
): ProductSummaryDraft {
  const input = validateProductSummaryInput(rawInput);
  const evidence = splitEvidence(input.sourceDescription);

  const highlights = evidence.slice(0, 3);
  const warnings: string[] = [];

  if (highlights.length === 0) {
    warnings.push("ยังไม่มีรายละเอียดสินค้ามากพอสำหรับสรุปจุดเด่น");
  }

  warnings.push(
    "ยังไม่ได้ตรวจสอบข้อมูลกับเว็บไซต์ผู้ผลิตหรือแหล่งข้อมูลอิสระ",
    "โปรดตรวจสอบราคา ตัวเลือกสินค้า และเงื่อนไขล่าสุดใน Shopee",
  );

  return {
    displayName: input.sourceTitle,
    summary: evidence[0]
      ? `${input.sourceTitle} เป็นสินค้าที่พบจากหน้า Shopee สำหรับหัวข้อ “${input.keyword}” โดยข้อมูลเบื้องต้นระบุว่า ${evidence[0]}`
      : `${input.sourceTitle} เป็นสินค้าที่พบจากหน้า Shopee สำหรับหัวข้อ “${input.keyword}” ขณะนี้ยังมีข้อมูลไม่เพียงพอสำหรับสรุปคุณสมบัติเชิงลึก`,
    highlights,
    limitations: [
      "ข้อมูลใน Draft มาจากข้อความที่ปรากฏบนหน้าสินค้า",
      "ยังไม่มีการยืนยันผลการใช้งานจริง",
    ],
    suitableFor: [
      `ผู้อ่านที่กำลังค้นหาข้อมูลเกี่ยวกับ ${input.keyword}`,
    ],
    verificationWarnings: warnings,
    sourceUrl: input.sourceUrl,
    affiliateUrl: input.affiliateUrl,
    imageUrl: input.imageUrl ?? null,
    contentStatus: "draft",
    verificationStatus: "unverified",
  };
}
