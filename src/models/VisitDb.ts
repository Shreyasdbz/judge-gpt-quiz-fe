import mongoose from "mongoose";
import { type IpGeoInfoDb } from "./ProfileDb";

export interface Visits extends mongoose.Document {
  referrer: string;
  timestamp: Date;
  ip_geo_location: IpGeoInfoDb;
}

/**
 * MongoDB schema for for collection "visits"
 */
const VisitSchema = new mongoose.Schema<Visits>({
  referrer: { type: String, required: true },
  timestamp: { type: Date, required: true },
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
      languages: { type: String, required: false },
      asn: { type: String, required: false },
      org: { type: String, required: false },
    },
    required: false,
  },
});

export default mongoose.models.Visit ||
  mongoose.model<Visits>("Visit", VisitSchema);
