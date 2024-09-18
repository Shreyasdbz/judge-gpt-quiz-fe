import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfileLocalFromDb,
  createNewUserProfileOnDb,
} from "./profile.utils";
import { Profile } from "@/models/Profile";

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
    const profile = await getUserProfileLocalFromDb({ uid });
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
 * - query: { uid: string }
 * - body: {
 *            createdAt: Date,
 *            username: string,
 *            gender: string,
 *            ageGroup: string,
 *            educationLevel: string,
 *            employmentStatus: string,
 *            politicalAffiliation: string,
 *            locale: string,
 *            userAgent: string,
 *            screenResolution: string,
 *          }
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
      createdAt,
      username,
      gender,
      ageGroup,
      educationLevel,
      employmentStatus,
      politicalAffiliation,
      locale,
      userAgent,
      screenResolution,
      ipGeoLocation,
    } = data;
    if (
      !createdAt ||
      !username ||
      !gender ||
      !ageGroup ||
      !educationLevel ||
      !employmentStatus ||
      !politicalAffiliation ||
      !locale ||
      !userAgent ||
      !screenResolution ||
      !ipGeoLocation
    ) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Create a new user profile on the server and return local profile (if successful)
    const newProfile: Profile = {
      uid,
      createdAt,
      username,
      gender,
      ageGroup,
      educationLevel,
      employmentStatus,
      politicalAffiliation,
      locale,
      userAgent,
      screenResolution,
      ipGeoLocation,
      totalScore: 0,
      servedArticles: [],
    };
    const result = await createNewUserProfileOnDb(newProfile);
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
}

/**
 * [PUT] /api/profile
 * Updates the user profile on the server and returns the local profile.
 * @param req: NextRequest
 * - query: { uid: string }
 * - body: { uid: string, gender, ageGroup, educationLevel, employmentStatus, politicalAffiliation }
 * @param res: NextResponse
 * - status: 200 | 400 | 500
 * - body: ProfileLocal | { error: string }
 */
async function PUT(req: NextRequest) {
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
  if (typeof uid !== "string") {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }
  // Parse body
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const {
    gender,
    ageGroup,
    educationLevel,
    employmentStatus,
    politicalAffiliation,
    locale,
    userAgent,
    screenResolution,
    ipGeoLocation,
  } = data;
  if (
    !gender ||
    !ageGroup ||
    !educationLevel ||
    !employmentStatus ||
    !politicalAffiliation ||
    !locale ||
    !userAgent ||
    !screenResolution ||
    !ipGeoLocation
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
 * - query: { uid: string }
 * @param res: NextResponse
 * - status: 200 | 400 | 500
 * - body: { deleteSuccessfull: boolean } | { error: string }
 */
async function DELETE(req: NextRequest) {
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
  if (typeof uid !== "string") {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }

  // Method not implemented
  return NextResponse.json(
    { error: "Method not implemented" },
    { status: 501 }
  );
}

export { GET, POST, PUT, DELETE };
