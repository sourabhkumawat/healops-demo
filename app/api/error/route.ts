import { NextResponse } from "next/server";

export async function GET() {
  // This error will be captured by HealOps OpenTelemetry SDK
  throw new Error("Sample JavaScript error triggered for HealOps demo");
}
