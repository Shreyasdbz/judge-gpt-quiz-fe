import { NextRequest, NextResponse } from "next/server";
import { getUserProfileLocal, createNewUserProfile } from "./profile.utils";

/**
 * [GET] /api/profile
 * Returns the user profile if available. Otherwise, returns a message or error.
 * @param req: NextRequest
 * - query: { uid: string }
 * @param res: NextResponse
 * - status: 200 | 400 | 404 | 500
 * - body: ProfileLocal | { error: string }
 */
async function GET(req: NextRequest) {
  try {
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
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    if (typeof uid !== "string") {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Fetch the user profile from the server
    const profile = await getUserProfileLocal({ uid });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    // Success
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * [POST] /api/profile
 * Creates a new user profile on the server and returns the local profile.
 * @param req: NextRequest
 * - body: { uid: string, username, gender, ageGroup, educationLevel, employmentStatus, politicalAffiliation }
 * @param res: NextResponse
 * - status: 200 | 400 | 500
 * - body: ProfileLocal | { error: string }
 */
async function POST(req: NextRequest) {
  try {
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
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    if (typeof uid !== "string") {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }
    // Parse body
    if (!req.body) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
    const {
      username,
      gender,
      ageGroup,
      educationLevel,
      employmentStatus,
      politicalAffiliation,
      locale,
    } = data;
    if (
      !username ||
      !gender ||
      !ageGroup ||
      !educationLevel ||
      !employmentStatus ||
      !politicalAffiliation ||
      !locale
    ) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Create a new user profile on the server and return local profile (if successful)
    const result = await createNewUserProfile({
      uid,
      username,
      ageGroup,
      educationLevel,
      employmentStatus,
      gender,
      politicalAffiliation,
      locale,
    });
    if (typeof result === "string") {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // Create a new user profile on the server and return local profile (if successful)
}

/**
 * [PUT] /api/profile
 * Updates the user profile on the server and returns the local profile.
 * @param req: NextRequest
 * - body: { uid: string, gender, ageGroup, educationLevel, employmentStatus, politicalAffiliation }
 * @param res: NextResponse
 * - status: 200 | 400 | 500
 * - body: ProfileLocal | { error: string }
 */
async function PUT(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  // Invlaid paths
  const {
    uid,
    gender,
    ageGroup,
    educationLevel,
    employmentStatus,
    politicalAffiliation,
  } = data;
  if (
    !uid ||
    !gender ||
    !ageGroup ||
    !educationLevel ||
    !employmentStatus ||
    !politicalAffiliation
  ) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  // Check if uid exists on the server
  // If not, error out

  // Valid paths
  // Update the user profile on the server and return local profile
}

/**
 * [DELETE] /api/profile
 * Deletes the user profile on the server.
 * @param req: NextRequest
 * - body: { uid: string }
 * @param res: NextResponse
 * - status: 200 | 400 | 500
 * - body: { deleteSuccessfull: boolean } | { error: string }
 */
async function DELETE(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  // Invlaid paths
  const { uid } = data;
  if (!uid) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // Valid paths
  // Delete the user profile on the server
}

export { GET, POST, PUT, DELETE };
