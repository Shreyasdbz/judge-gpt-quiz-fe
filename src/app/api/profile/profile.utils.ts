import axios from "axios";
import {
  AgeGroupOptions,
  BASIC_AVATAR_URL,
  EducationLevelOptions,
  EmploymentStatusOptions,
  GenderOptions,
  PoliticalAffiliationOptions,
  Profile,
  ProfileLocal,
  ProfileStatistics,
} from "@/models/Profile";
import ProfileDb, { IpGeoInfoDb } from "@/models/ProfileDb";
import ResponseDb from "@/models/ResponseDb";
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
      const localProfile: ProfileLocal = {
        uid: result.uid,
        username: result.username,
        gender: result.gender,
        ageGroup: result.age_group,
        educationLevel: result.education_level,
        employmentStatus: result.employment_status,
        politicalAffiliation: result.political_affiliation,
        locale: result.locale,
        totalScore: result.total_score,
        avatarImageUrl: result.avatar_image_url,
        achievementsUnlocked: result.achievements_unlocked,
      };
      return localProfile;
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
export async function createNewUserProfileOnDb({
  newProfile,
  ipGeoInfo,
}: {
  newProfile: Profile;
  ipGeoInfo: IpGeoInfoDb;
}): Promise<ProfileLocal | string> {
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
    ip_geo_location: ipGeoInfo,
    total_score: newProfile.totalScore,
    served_articles: newProfile.servedArticles,
    avatar_image_url: BASIC_AVATAR_URL,
    achievements_unlocked: newProfile.achievementsUnlocked,
  });
  if (profileResult && typeof profileResult === "object") {
    return sanitizeProfileToProfileLocal(profileResult as Profile);
  } else {
    return "Error creating profile";
  }
}

export async function updateUserProfileOnDb({
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
}: {
  uid: string;
  gender?: string;
  ageGroup?: string;
  educationLevel?: string;
  employmentStatus?: string;
  politicalAffiliation?: string;
  locale?: string;
  userAgent?: string;
  screenResolution?: string;
  avatarImageUrl?: string;
}): Promise<ProfileLocal | string> {
  // Step 1: Fetch the user profile from the database
  await connectToDatabase();
  const profileResult = await ProfileDb.findOne({
    uid: uid,
  });
  if (!profileResult) {
    return "User not found";
  }

  // Step 2: Update the user profile
  if (gender && gender != "" && gender != profileResult) {
    profileResult.gender = gender;
  }
  if (ageGroup && (ageGroup !== "" && ageGroup) !== profileResult) {
    profileResult.age_group = ageGroup;
  }
  if (
    educationLevel &&
    (educationLevel !== "" && educationLevel) !== profileResult
  ) {
    profileResult.education_level = educationLevel;
  }
  if (
    employmentStatus &&
    (employmentStatus !== "" && employmentStatus) !== profileResult
  ) {
    profileResult.employment_status = employmentStatus;
  }
  if (
    politicalAffiliation &&
    (politicalAffiliation !== "" && politicalAffiliation) !== profileResult
  ) {
    profileResult.political_affiliation = politicalAffiliation;
  }
  if (locale && (locale !== "" && locale) !== profileResult) {
    profileResult.locale = locale;
  }
  if (userAgent && (userAgent !== "" && userAgent) !== profileResult) {
    profileResult.user_agent = userAgent;
  }
  if (
    screenResolution &&
    (screenResolution !== "" && screenResolution) !== profileResult
  ) {
    profileResult.screen_resolution = screenResolution;
  }
  if (
    avatarImageUrl &&
    (avatarImageUrl !== "" && avatarImageUrl) !== profileResult
  ) {
    profileResult.avatar_image_url = avatarImageUrl;
  }

  // Check for new achievements unlocked
  // TODO: Implement achievements

  // Step 3: Save the updated profile
  const sanitizedProfile = sanitizeOnProfileSave(profileResult);
  profileResult.set(sanitizedProfile);
  const updatedProfileResult = await profileResult.save();

  if (updatedProfileResult && typeof updatedProfileResult === "object") {
    const localProfile: ProfileLocal = {
      uid: updatedProfileResult.uid,
      username: updatedProfileResult.username,
      gender: updatedProfileResult.gender,
      ageGroup: updatedProfileResult.age_group,
      educationLevel: updatedProfileResult.education_level,
      employmentStatus: updatedProfileResult.employment_status,
      politicalAffiliation: updatedProfileResult.political_affiliation,
      locale: updatedProfileResult.locale,
      totalScore: updatedProfileResult.total_score,
      avatarImageUrl: updatedProfileResult.avatar_image_url,
      achievementsUnlocked: updatedProfileResult.achievements_unlocked,
    };
    return localProfile;
  }

  return "error";
}

export async function getGeoLocationInfo(
  originIpAddr: string
): Promise<IpGeoInfoDb | null> {
  const IpApiUrl = "https://ipapi.co";
  const response = await axios.get(`${IpApiUrl}/${originIpAddr}/json`);
  if (!response) {
    return null;
  }
  if (response.status === 200) {
    const data = response.data;
    if (!data) {
      return null;
    }
    const returnValue: IpGeoInfoDb = {
      ip: data.ip,
      network: data.network,
      version: data.version,
      city: data.city,
      region: data.region,
      region_code: data.region_code,
      country: data.country,
      country_name: data.country_name,
      country_code: data.country_code,
      country_code_iso3: data.country_code_iso3,
      country_capital: data.country_capital,
      country_tld: data.country_tld,
      continent_code: data.continent_code,
      in_eu: data.in_eu,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      utc_offset: data.utc_offset,
      country_calling_code: data.country_calling_code,
      currency: data.currency,
      currency_name: data.currency_name,
      languages: data.languages,
      country_area: data.country_area,
      country_population: data.country_population,
      asn: data.asn,
      org: data.org,
    };
    return returnValue;
  }
  return null;
}

/**
 * Update the avatar image URL for the user profile.
 * @param uid
 * @param avatarImageUrl
 * @returns boolean | null: (true if updated, false if not updated, null if error)
 */
export async function updateProfileAvatarOnDb({
  uid,
  avatarImageUrl,
}: {
  uid: string;
  avatarImageUrl: string;
}): Promise<boolean | null> {
  try {
    await connectToDatabase();

    const profileResult = await ProfileDb.findOne({
      uid: uid,
    });
    if (!profileResult) {
      console.error("Profile not found. Uid: ", uid);
      return null;
    }

    profileResult.avatar_image_url = avatarImageUrl;
    const sanitizedProfile = sanitizeOnProfileSave(profileResult);
    profileResult.set(sanitizedProfile);
    const updatedProfileResult = await profileResult.save();
    if (updatedProfileResult && typeof updatedProfileResult === "object") {
      return true;
    } else {
      console.error("Error updating profile avatar image URL. Uid: ", uid);
      return false;
    }
  } catch (error) {
    console.error("Error updating profile avatar image URL. error: ", error);
    return null;
  }
}

/**
 * Aggregate the user's statistics from the database.
 * @param userUid
 * @returns
 */
export async function getUserStatsFromDb(
  userUid: string
): Promise<ProfileStatistics | null> {
  const userStats: ProfileStatistics = {
    totalScore: 0,
    totalQuestionsAnswered: 0,
    percentCorrect: 0,
    percentRespondedIsHuman: 0,
    percentRespondedIsFake: 0,
    averageTimeToRespond: 0,
  };

  // Get profile from database
  await connectToDatabase();
  const profileResult = await ProfileDb.findOne({ uid: userUid });
  if (!profileResult) {
    return null;
  }

  // Total score
  userStats.totalScore = profileResult.total_score;

  // Total questions answered
  // - Get all responses from the database for the user
  const allUserResponsesResult = await ResponseDb.find({
    user_uid: { $eq: userUid },
  });
  if (!allUserResponsesResult) {
    return null;
  }
  userStats.totalQuestionsAnswered = allUserResponsesResult.length;

  // Percent of questions answered correctly
  // - Calculate the percentage of correct responses (total_score / length of responses)
  // - zero division check
  if (userStats.totalQuestionsAnswered > 0) {
    userStats.percentCorrect =
      (userStats.totalScore / userStats.totalQuestionsAnswered) * 100;
  }

  // Percent of times selected human-authored for article
  if (userStats.totalQuestionsAnswered > 0) {
    const totalHumanResponses = allUserResponsesResult.filter(
      (response) => response.user_responded_is_human === 0
    ).length;
    if (totalHumanResponses > 0) {
      userStats.percentRespondedIsHuman =
        (totalHumanResponses / userStats.totalQuestionsAnswered) * 100;
    }
  }

  // Percent of times selected fake for article
  if (userStats.totalQuestionsAnswered > 0) {
    const totalFakeResponses = allUserResponsesResult.filter(
      (response) => response.user_responded_is_fake === 1
    ).length;
    if (totalFakeResponses > 0) {
      userStats.percentRespondedIsFake =
        (totalFakeResponses / userStats.totalQuestionsAnswered) * 100;
    }
  }

  // Average time to respond
  // - Calculate the average time to respond for all responses
  // - zero division check
  if (userStats.totalQuestionsAnswered > 0) {
    const totalResponseTime = allUserResponsesResult.reduce(
      (acc, response) => acc + response.time_to_respond,
      0
    );
    userStats.averageTimeToRespond =
      totalResponseTime / (userStats.totalQuestionsAnswered * 1000);
  }

  return userStats;
}

/**
 * ////////////////////////////////////////////////
 * Internal functions
 * ////////////////////////////////////////////////
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeOnProfileSave(profileFromDb: any): any {
  const profileToSave = profileFromDb;

  // Make sure every field exists
  if (!profileToSave.username) {
    profileToSave.username = profileToSave.uid;
  }
  if (!profileToSave.gender) {
    profileToSave.gender = GenderOptions.DeclineToSay;
  }
  if (!profileToSave.age_group) {
    profileToSave.age_group = AgeGroupOptions.DeclineToSay;
  }
  if (!profileToSave.education_level) {
    profileToSave.education_level = EducationLevelOptions.DeclineToSay;
  }
  if (!profileToSave.employment_status) {
    profileToSave.employment_status = EmploymentStatusOptions.DeclineToSay;
  }
  if (!profileToSave.political_affiliation) {
    profileToSave.political_affiliation =
      PoliticalAffiliationOptions.DeclineToSay;
  }
  if (!profileToSave.locale) {
    profileToSave.locale = "unknown";
  }
  if (!profileToSave.user_agent) {
    profileToSave.user_agent = "unknown";
  }
  if (!profileToSave.screen_resolution) {
    profileToSave.screen_resolution = "unknown";
  }
  if (!profileToSave.total_score) {
    profileToSave.total_score = 0;
  }
  if (!profileToSave.served_articles) {
    profileToSave.served_articles = [];
  }
  if (!profileToSave.avatar_image_url) {
    profileToSave.avatar_image_url = BASIC_AVATAR_URL;
  }
  if (!profileToSave.achievements_unlocked) {
    profileToSave.achievements_unlocked = [];
  }
  if (!profileToSave.ip_geo_location) {
    profileToSave.ip_geo_location = {};
  }

  return profileToSave;
}

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
    avatarImageUrl: profile.avatarImageUrl,
    achievementsUnlocked: profile.achievementsUnlocked,
  };

  return profileLocal;
}
