import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  console.log("GET request to /api/scores: ", req);
  return NextResponse.json({ message: "GET request to /api/scores" });
}

export { GET };
