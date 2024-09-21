/**
 * Gets user achievements.
 */

import { NextRequest, NextResponse } from "next/server";
// import { getUserAchievementsFromDb } from "../profile.utils";

/**
 * Retrieves a set of user achievements.
 * @param req: NextRequest
 * - query: { uid: string }
 * - body: { checkForAchievements: ProfileAchievements[] }
 * @param req: NextResponse
 * - status: 200 | 400 | 500
 * - body: { achieved: ProfileAchievements[] }
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
  // Parse body
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const { checkForAchievements } = data;
  if (!checkForAchievements) {
    return NextResponse.json(
      { error: "Achievements are required" },
      { status: 400 }
    );
  }
  if (!Array.isArray(checkForAchievements)) {
    return NextResponse.json(
      { error: "Invalid achievements" },
      { status: 400 }
    );
  }

  // const achievementsResult = await getUserAchievementsFromDb(uid);
  // if (!achievementsResult) {
  //   return NextResponse.json(
  //     { error: "Failed to retrieve achievements" },
  //     { status: 500 }
  //   );
  // }

  // Method not implemented
  return NextResponse.json(
    { error: "Method not implemented" },
    { status: 501 }
  );
}
