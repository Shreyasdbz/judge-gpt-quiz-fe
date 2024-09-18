import { NextRequest, NextResponse } from "next/server";
import { isUsernameAvailableOnDb } from "../profile/profile.utils";

/**
 * [GET] /api/username
 * Checks if the username is available.
 * @param req: NextRequest
 * - query: { username: string }
 * @returns NextResponse
 * - status: 200 | 400 | 500
 * - body: { isAvailable: boolean }
 */
export async function GET(request: NextRequest) {
  try {
    // Get the username from query parameters
    const { searchParams } = new URL(request.url);
    if (!searchParams) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }
    if (typeof username !== "string") {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    const isAvailable = await isUsernameAvailableOnDb(username);

    // Success
    return NextResponse.json({ available: isAvailable }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
