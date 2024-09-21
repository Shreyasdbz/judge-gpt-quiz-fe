/**
 * API for handling everything avatar related
 */

import { NextRequest, NextResponse } from "next/server";
import { updateProfileAvatarOnDb } from "../profile.utils";

/**
 * [PUT] /api/profile/avatar
 * Sets the user's avatar image URL
 * @param request: NextRequest
 * - query: { uid: string }
 * - body: { avatarImageUrl: string }
 * @return NextResponse
 * - status: 200 | 404 | 500
 */
async function PUT(req: NextRequest) {
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
  if (typeof uid !== "string") {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }
  // Parse body
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const { avatarImageUrl } = data;
  if (!avatarImageUrl) {
    return NextResponse.json(
      { error: "Avatar Image URL is required" },
      { status: 400 }
    );
  }

  const result = await updateProfileAvatarOnDb({ uid, avatarImageUrl });
  if (result === null) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } else if (result === false) {
    return NextResponse.json(
      { error: "Failed to update avatar image URL" },
      { status: 404 }
    );
  } else {
    return NextResponse.json({}, { status: 200 });
  }
}

export { PUT };
