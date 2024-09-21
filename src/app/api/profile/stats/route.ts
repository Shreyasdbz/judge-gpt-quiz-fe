/**
 * Gets user stats.
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves a set of user stats.
 * @param req: NextRequest
 * - query: { uid: string }
 * @param req: NextResponse
 * - status: 200 | 400 | 500
 * - body: { stats: Stats }
 */
export async function GET(req: NextRequest) {
  // Get the uid from query parameters
  const { searchParams } = new URL(req.url);
  if (!searchParams) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }
  const uid = searchParams.get("uid");
  if (!uid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  // Method not implemented
  return NextResponse.json(
    { error: "Method not implemented" },
    { status: 501 }
  );
}
