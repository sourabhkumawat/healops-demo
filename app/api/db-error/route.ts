import { NextResponse } from "next/server";

export async function GET() {
  // Simulate a database connection error
  return NextResponse.json(
    { 
      error: "Database connection failed",
      message: "Unable to connect to PostgreSQL database at localhost:5432",
      code: "DB_CONNECTION_ERROR"
    },
    { status: 500 }
  );
}
