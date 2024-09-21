/**
 * API for handling everything avatar related
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllAvatarsFromDb, getAvatarByIdFromDb } from "../profile.utils";

/**
 * [GET] /api/profile/avatar
 * Retrieves all or a specific avatar
 * @param request: NextRequest
 * - query: { avatarId: ["id" or "all"] }
 * @return NextResponse
 * - status: 200 | 404 | 500
 * - body: { avatarData: Avatar[] }
 */
async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (!searchParams) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }
  const avatarId = searchParams.get("avatarId");
  if (!avatarId) {
    return NextResponse.json(
      { error: "Avatar ID is required" },
      { status: 400 }
    );
  }

  if (avatarId === "all") {
    const avatarsResult = await getAllAvatarsFromDb();
    if (!avatarsResult) {
      return NextResponse.json(
        { error: "Failed to retrieve avatars" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { avatarData: avatarsResult },
      {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    );
  } else {
    const avatarResult = await getAvatarByIdFromDb(avatarId);
    if (!avatarResult) {
      return NextResponse.json(
        { error: "Failed to retrieve avatar" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { avatarData: [avatarResult] },
      {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    );
  }
}

export { GET };
