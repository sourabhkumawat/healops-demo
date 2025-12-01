import { NextResponse } from "next/server";

export async function GET() {
  // Simulate a timeout by delaying response for 6 seconds
  await new Promise((resolve) => setTimeout(resolve, 6000));
  
  return NextResponse.json(
    { 
      error: "Request timeout",
      message: "The request took too long to process (>5s)",
      code: "TIMEOUT_ERROR"
    },
    { status: 504 }
  );
}
