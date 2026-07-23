import { NextResponse } from "next/server";

import {
  generateSafeProductSummary,
  type ProductSummaryInput,
} from "@/lib/content-engine/product-summary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductSummaryInput;
    const draft = generateSafeProductSummary(input);

    return NextResponse.json({ ok: true, draft });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate draft";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 },
    );
  }
}
