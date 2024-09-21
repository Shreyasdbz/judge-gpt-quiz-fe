/**
 * Gets user stats.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserStatsFromDb } from "../profile.utils";

/**
 * Retrieves a set of user stats.
 * @param req: NextRequest
 * - query: { uid: string }
 * @param req: NextResponse
 * - status: 200 | 400 | 500
 * - body: { ProfileStatistics }
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

  const statsResult = await getUserStatsFromDb(uid);
  if (!statsResult) {
    return NextResponse.json(
      { error: "Failed to retrieve stats" },
      { status: 500 }
    );
  }

  return NextResponse.json({ statsResult }, { status: 200 });
}
