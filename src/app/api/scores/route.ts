import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  console.error("GET request to /api/scores: ", req);

  // Method not implemented
  return NextResponse.json(
    { error: "Method not implemented" },
    { status: 501 }
  );
}

export { GET };
