import mongoose from "mongoose";

/**
 * Primary profile object
 * @param uid - User ID
 * @param created_at - Profile creation datetime
 * @param username - User's public display name
 * @param gender - User's gender
 * @param age_group - User's age group
 * @param education_level - User's education level
 * @param employment_status - User's employment status
 * @param political_affiliation - User's political affiliation
 * @param locale - User's locale
 * @param user_agent - User's user agent
 * @param screen_resolution - User's screen resolution
 * @param ip_geo_location - User's IP-address based geolocation
 * @param total_score - User's total score
 * @param served_articles - List of IDs of articles served to the user
 */
export interface Profiles extends mongoose.Document {
  uid: string;
  created_at: Date;
  username: string;
  gender: string;
  age_group: string;
  education_level: string;
  employment_status: string;
  political_affiliation: string;
  locale: string;
  user_agent: string;
  screen_resolution: string;
  ip_geo_location: string;
  total_score: number;
  served_articles: string[];
}

/**
 * MongoDB schema for for collection "profiles"
 */
const ProfileSchema = new mongoose.Schema<Profiles>({
  uid: { type: String, required: true },
  created_at: { type: Date, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  age_group: { type: String, required: true },
  education_level: { type: String, required: true },
  employment_status: { type: String, required: true },
  political_affiliation: { type: String, required: true },
  locale: { type: String, required: true },
  user_agent: { type: String, required: true },
  screen_resolution: { type: String, required: true },
  ip_geo_location: { type: String, required: true },
  total_score: { type: Number, required: true },
  served_articles: { type: [String], required: true },
});

export default mongoose.models.Profile ||
  mongoose.model<Profiles>("Profile", ProfileSchema);
