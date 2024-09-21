import { z } from "zod";

export const LOCAL_STORAGE_KEY_PROFILE = "judgegpt_app_profile_uid";

export const AvatarUrls = [
  "https://jdugegptstorage1.blob.core.windows.net/avatars/basic-avatar-3.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/basic-avatar-2.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/basic-avatar.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/0DEBF493-634D-41F0-A487-3DBAD032BE6D.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/312FAE66-5813-4076-A014-D1E62F4C41C1.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/3496B3C9-A791-41F3-A1BF-EF1D95D17CE8.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/5060D8EF-3F29-40B0-AA16-BE5853386C76.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/5F586AD1-588B-44FA-A83B-4E6E14C22F45.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/727D722A-D1FC-4C0E-8260-4235632A0148.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/915A0AF5-59CA-4BE0-A695-A05441BB7C56.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/9EC1C28D-A8E2-45E7-9A6C-C8D55B8B32F0.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/B0E9554F-1620-4295-B081-912BAD89DFDE.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/D0B8FA55-7D92-436B-B3BA-D7A39FF289AC.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/D87617AF-B6A6-4C06-BFF2-A4FBBBA95647.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/DC6893C0-8241-46A5-8395-FD6B2CD4577A.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/EB3C03F6-3DF1-4467-BD4E-9081CDE4E467.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/FB093E3D-BDBF-4CFD-80CD-16B728AB45B2.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/FF29FAC5-8283-4CBE-889C-F7D89D0B87F0.jpeg",
  "https://jdugegptstorage1.blob.core.windows.net/avatars/FF7B5EE5-32D8-4DD8-A439-5CC9901FE3AF.jpeg",
];
export const BASIC_AVATAR_URL = AvatarUrls[0];

export enum GenderOptions {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  DeclineToSay = "DeclineToSay",
}

export enum AgeGroupOptions {
  Below18 = "Below18",
  From18To24 = "From18To24",
  From25To34 = "From25To34",
  From35To44 = "From35To44",
  From45To54 = "From45To54",
  Above54 = "Above54",
  DeclineToSay = "DeclineToSay",
}

export enum EducationLevelOptions {
  HighSchool = "HighSchool",
  SomeCollege = "SomeCollege",
  Associates = "Associates",
  Bachelors = "Bachelors",
  Masters = "Masters",
  PhD = "PhD",
  Other = "Other",
  DeclineToSay = "DeclineToSay",
}

export enum EmploymentStatusOptions {
  Employed = "Employed",
  Unemployed = "Unemployed",
  Student = "Student",
  Retired = "Retired",
  Other = "Other",
  DeclineToSay = "DeclineToSay",
}

export enum PoliticalAffiliationOptions {
  VeryConservative = "VeryConservative",
  Conservative = "Conservative",
  Moderate = "Moderate",
  Progressive = "Progressive",
  VeryProgressive = "VeryProgressive",
  DeclineToSay = "DeclineToSay",
}

export interface AvatarImage {
  name: string;
  data: Blob;
}

export interface ProfileStatistics {
  totalScore: number;
  totalQuestionsAnswered: number;
  percentCorrect: number;
  percentRespondedIsHuman: number;
  percentRespondedIsFake: number;
  averageTimeToRespond: number;
  // TODO: Add more statistics
  // - Time of the day most active
  // - Day of the week most active
}

export enum ProfileAchievements {
  FirstSteps = "FirstSteps", // Read first article
  Novice = "Novice", // Read 15 articles
  Apprentice = "Apprentice", // Read 30 articles
  Expert = "Expert", // Read 50 articles
  Master = "Master", // Read 100 articles
  SpotTheFake = "SpotTheFake", // Spotted first fake article correctly
  TruthSeeker = "TruthSeeker", // Spotted first real article correctly
  InTheZone = "InTheZone", // Guessed 5 articles in a row correctly
  HotStreak = "HotStreak", // Guessed 10 articles in a row correctly
  MultiLingual = "MultiLingual", // Guessed on articles in 2 languages
  DefenderOfDemocracy = "DefenderOfDemocracy", // Guessed on International Democracy Day
}

/**
 * Primary profile object
 * @param uid - User ID
 * @param createdAt - Profile creation datetime
 * @param username - User's public display name
 * @param gender - User's gender
 * @param ageGroup - User's age group
 * @param educationLevel - User's education level
 * @param employmentStatus - User's employment status
 * @param politicalAffiliation - User's political affiliation
 * @param locale - User's locale
 * @param userAgent - User's user agent
 * @param screenResolution - User's screen resolution
 * @param totalScore - User's total score
 * @param servedArticles - List of IDs of articles served to the user
 */
export interface Profile {
  uid: string;
  createdAt: Date;
  username: string;
  gender: string;
  ageGroup: string;
  educationLevel: string;
  employmentStatus: string;
  politicalAffiliation: string;
  locale: string;
  userAgent: string;
  screenResolution: string;
  totalScore: number;
  servedArticles: string[];
  avatarImageUrl: string;
  achievementsUnlocked: string[];
}

/**
 * Local (on-device) profile object to be maintained in state
 * Only includes:
 * - uid
 * - username
 * - gender
 * - ageGroup
 * - educationLevel
 * - employmentStatus
 * - politicalAffiliation
 * - totalScore
 * - avatarImageUrl
 * - achievementsUnlocked
 */
export interface ProfileLocal
  extends Omit<
    Profile,
    "createdAt" | "userAgent" | "screenResolution" | "servedArticles"
  > {}

/**
 * Update profile object
 * Doesn't include uid, username, totalScore, or servedArticles
 */
export interface ProfileUpdateData
  extends Omit<Profile, "uid" | "username" | "totalScore" | "servedArticles"> {}

/**
 * Profile form schema for validation
 */
export const ProfileFormSchema = z.object({
  username: z
    .string({
      message: "Please enter a username",
    })
    .min(4, {
      message: "Username must be at least 4 characters long",
    })
    .max(20, {
      message: "Username must be at most 20 characters long",
    }),
  usernameIsAvailable: z.literal<boolean>(true, {
    message: "Username is not available",
  }),
  gender: z
    .string({
      message: "Please select an option for gender",
    })
    .min(2),
  age: z
    .string({
      message: "Please select an option for age",
    })
    .min(2),
  educationLevel: z
    .string({
      message: "Please select an option for education level",
    })
    .min(2),
  employmentStatus: z
    .string({
      message: "Please select an option for employment status",
    })
    .min(2),
  politicalAffiliation: z
    .string({
      message: "Please select an option for political affiliation",
    })
    .min(2),
  consentToDataCollection: z
    .boolean({
      message: "Please consent to data collection to continue",
    })
    .refine((value) => value === true, {
      message: "Please consent to data collection to continue",
    }),
  avatarImageUrl: z.string().optional(),
});
