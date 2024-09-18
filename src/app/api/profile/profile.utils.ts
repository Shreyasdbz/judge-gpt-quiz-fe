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
export async function isUidAvailableOnDb(uid: string): Promise<boolean | null> {
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
export async function isUsernameAvailableOnDb(
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
export async function getUserProfileLocalFromDb({
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
export async function createNewUserProfileOnDb(
  newProfile: Profile
): Promise<ProfileLocal | string> {
  // Step 1: Make sure uid is unique
  const uidAvailable = await isUidAvailableOnDb(newProfile.uid);
  if (uidAvailable === null || uidAvailable === false) {
    return "uid already exists";
  }
  // Step 2: Make sure username is unique
  const usernameAvailable = await isUsernameAvailableOnDb(newProfile.username);
  if (usernameAvailable === null || usernameAvailable === false) {
    return "username already exists";
  }
  // Step 3: Add new profile to the database
  await connectToDatabase();
  const profileResult = await ProfileDb.create({
    uid: newProfile.uid,
    created_at: new Date(),
    username: newProfile.username,
    gender: newProfile.gender,
    age_group: newProfile.ageGroup,
    education_level: newProfile.educationLevel,
    employment_status: newProfile.employmentStatus,
    political_affiliation: newProfile.politicalAffiliation,
    locale: newProfile.locale,
    user_agent: newProfile.userAgent,
    screen_resolution: newProfile.screenResolution,
    ip_geo_location: newProfile.ipGeoLocation,
    total_score: newProfile.totalScore,
    served_articles: newProfile.servedArticles,
  });
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
  const profileLocal: ProfileLocal = {
    uid: profile.uid,
    username: profile.username,
    gender: profile.gender,
    ageGroup: profile.ageGroup,
    educationLevel: profile.educationLevel,
    employmentStatus: profile.employmentStatus,
    politicalAffiliation: profile.politicalAffiliation,
    totalScore: profile.totalScore,
    locale: profile.locale,
  };

  return profileLocal;
}
