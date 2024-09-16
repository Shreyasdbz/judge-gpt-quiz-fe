import { Profile, ProfileLocal } from "@/models/Profile";
import ProfileDb from "@/models/ProfileDb";
import { connectToDatabase } from "@/lib/db";

/**
 * ////////////////////////////////////////////////
 * Public functions
 * ////////////////////////////////////////////////
 */

/**
 * Check if the uid is available in the database.
 * @param uid
 * @returns boolean | null: (true if available, false if not available, null if error)
 */
export async function isUidAvailable(uid: string): Promise<boolean | null> {
  try {
    await connectToDatabase();
    // Query the database for the uid
    const result = await ProfileDb.findOne({
      uid: uid,
    });
    if (result) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Check if the username is available in the database.
 * @param username
 * @returns boolean | null: (true if available, false if not available, null if error
 */
export async function isUsernameAvailable(
  username: string
): Promise<boolean | null> {
  try {
    await connectToDatabase();
    // Query the database for the username
    const result = await ProfileDb.findOne({
      username: username,
    });
    if (result) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Get the user profile from the database.
 * @param uid
 * @returns ProfileLocal | string | null: (ProfileLocal if found, string if error, null if not found)
 */
export async function getUserProfileLocal({
  uid,
}: {
  uid: string;
}): Promise<ProfileLocal | string | null> {
  try {
    await connectToDatabase();
    // Query the database for the user profile
    const result = await ProfileDb.findOne({ uid });
    if (result) {
      return sanitizeProfileToProfileLocal(result as Profile);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Create a new user profile on the server.
 * @param uid
 * @param username
 * @param gender
 * @param ageGroup
 * @param educationLevel
 * @param employmentStatus
 * @param politicalAffiliation
 * @returns ProfileLocal | string: (ProfileLocal if created, string if error)
 * - "uid already exists" if uid is not unique
 * - "username already exists" if username is not unique
 */
export async function createNewUserProfile({
  uid,
  username,
  gender,
  ageGroup,
  educationLevel,
  employmentStatus,
  politicalAffiliation,
  locale,
}: {
  uid: string;
  username: string;
  gender: string;
  ageGroup: string;
  educationLevel: string;
  employmentStatus: string;
  politicalAffiliation: string;
  locale: string;
}): Promise<ProfileLocal | string> {
  // TODO: Validate with real data
  // Step 1: Make sure uid is unique
  const uidAvailable = await isUidAvailable(uid);
  if (!uidAvailable || isUidAvailable === null) {
    return "uid already exists";
  }
  // TODO: Validate with real data
  // Step 2: Make sure username is unique
  const usernameAvailable = await isUsernameAvailable(username);
  if (!usernameAvailable || usernameAvailable === null) {
    return "username already exists";
  }
  // Step 3: Create the new profile
  const newProfile: Profile = {
    uid,
    username,
    gender,
    ageGroup,
    educationLevel,
    employmentStatus,
    politicalAffiliation,
    locale,
    totalScore: 0,
    servedArticles: [],
  };
  // TODO: Add locale

  await connectToDatabase();
  const profileResult = await ProfileDb.create(newProfile);
  if (profileResult && typeof profileResult === "object") {
    return sanitizeProfileToProfileLocal(profileResult as Profile);
  } else {
    return "Error creating profile";
  }
}

/**
 * ////////////////////////////////////////////////
 * Internal functions
 * ////////////////////////////////////////////////
 */

function sanitizeProfileToProfileLocal(profile: Profile): ProfileLocal {
  return {
    username: profile.username,
    ageGroup: profile.ageGroup,
    educationLevel: profile.educationLevel,
    employmentStatus: profile.employmentStatus,
    gender: profile.gender,
    politicalAffiliation: profile.politicalAffiliation,
    locale: profile.locale,
    totalScore: profile.totalScore,
  };
}
