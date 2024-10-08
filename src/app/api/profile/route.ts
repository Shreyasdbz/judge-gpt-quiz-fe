import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfileLocalFromDb,
  createNewUserProfileOnDb,
  updateUserProfileOnDb,
  getGeoLocationInfo,
} from "./profile.utils";
import { BASIC_AVATAR_URL, Profile } from "@/models/Profile";
import { IpGeoInfoDb } from "@/models/ProfileDb";

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
    console.log(profile);
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
 * - headers: { x-forwarded-for: string }
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
    // Get headers for "x-forwarded-for" property
    const originIpAddr = req.headers.get("x-forwarded-for");
    if (!originIpAddr) {
      return NextResponse.json(
        { error: "IP Address not found in headers" },
        { status: 400 }
      );
    }
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
      !screenResolution
    ) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Get IP Address Geo Location Information
    let ipGeoInfo: IpGeoInfoDb = {};
    const geoLocation = await getGeoLocationInfo(originIpAddr);
    if (geoLocation) {
      ipGeoInfo = geoLocation;
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
      totalScore: 0,
      servedArticles: [],
      achievementsUnlocked: [],
      avatarImageUrl: BASIC_AVATAR_URL,
    };
    const result = await createNewUserProfileOnDb({ newProfile, ipGeoInfo });
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
 * - body: {
 *    gender?: string,
 *    ageGroup?: string,
 *    educationLevel?: string,
 *    employmentStatus?: string,
 *    politicalAffiliation?: string,
 *    locale?: string,
 *    userAgent?: string,
 *    screenResolution?: string,
 *    avatarImageUrl?: string,
 *  }
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
    avatarImageUrl,
  } = data;

  const updateResult = await updateUserProfileOnDb({
    uid,
    gender,
    ageGroup,
    educationLevel,
    employmentStatus,
    politicalAffiliation,
    locale,
    userAgent,
    screenResolution,
    avatarImageUrl,
  });

  if (typeof updateResult === "string") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } else {
    return NextResponse.json(updateResult, { status: 200 });
  }
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
