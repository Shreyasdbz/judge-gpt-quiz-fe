import { z } from "zod";

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
}

export enum EducationLevelOptions {
  HighSchool = "HighSchool",
  Bachelors = "Bachelors",
  Masters = "Masters",
  PhD = "PhD",
  Other = "Other",
}

export enum EmploymentStatusOptions {
  Employed = "Employed",
  Unemployed = "Unemployed",
  Student = "Student",
  Retired = "Retired",
  Other = "Other",
}

export enum PoliticalAffiliationOptions {
  VeryConservative = "VeryConservative",
  Conservative = "Conservative",
  Moderate = "Moderate",
  Liberal = "Liberal",
  VeryLiberal = "VeryLiberal",
}

/**
 * Primary profile object
 * @param uid - User ID
 * @param username - User's public display name
 * @param ageGroup - User's age group
 * @param educationLevel - User's education level
 * @param employmentStatus - User's employment status
 * @param politicalAffiliation - User's political affiliation
 * @param locale - User's locale
 * @param totalScore - User's total score
 * @param servedArticlesIds - List of IDs of articles served to the user
 */
export interface Profile {
  uid: string;
  username: string;
  gender: string;
  ageGroup: string;
  educationLevel: string;
  employmentStatus: string;
  politicalAffiliation: string;
  locale: string;
  totalScore: number;
  servedArticles: string[];
}

/**
 * Local (on-device) profile object
 */
export interface ProfileLocal extends Omit<Profile, "uid" | "servedArticles"> {}

/**
 * Update profile object
 * Doesn't include uid, username, totalScore, or servedArticles
 */
export interface ProfileUpdateData
  extends Omit<Profile, "uid" | "username" | "totalScore" | "servedArticles"> {}

export const LOCAL_STORAGE_KEY_PROFILE = "judgegpt_app_profile_uid";

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
  language: z.string(),
});
