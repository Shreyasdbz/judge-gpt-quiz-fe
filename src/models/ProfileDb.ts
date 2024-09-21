import mongoose from "mongoose";

export type IpGeoInfoDb = {
  ip?: string;
  network?: string;
  version?: string;
  city?: string;
  region?: string;
  region_code?: string;
  country?: string;
  country_name?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: boolean;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
};

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
  ip_geo_location: IpGeoInfoDb;
  total_score: number;
  served_articles: string[];
  avatar_image_url: string;
  achievements_unlocked: string[];
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
  ip_geo_location: {
    type: {
      ip: { type: String, required: false },
      network: { type: String, required: false },
      version: { type: String, required: false },
      city: { type: String, required: false },
      region: { type: String, required: false },
      region_code: { type: String, required: false },
      country: { type: String, required: false },
      country_name: { type: String, required: false },
      country_code: { type: String, required: false },
      country_code_iso3: { type: String, required: false },
      country_capital: { type: String, required: false },
      country_tld: { type: String, required: false },
      continent_code: { type: String, required: false },
      in_eu: { type: Boolean, required: false },
      postal: { type: String, required: false },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
      timezone: { type: String, required: false },
      utc_offset: { type: String, required: false },
      country_calling_code: { type: String, required: false },
      currency: { type: String, required: false },
      currency_name: { type: String, required: false },
      languages: { type: String, required: false },
      country_area: { type: Number, required: false },
      country_population: { type: Number, required: false },
      asn: { type: String, required: false },
      org: { type: String, required: false },
    },
    required: true,
  },
  total_score: { type: Number, required: true },
  served_articles: { type: [String], required: true },
  avatar_image_url: { type: String, required: false },
  achievements_unlocked: { type: [String], required: true },
});

export default mongoose.models.Profile ||
  mongoose.model<Profiles>("Profile", ProfileSchema);
