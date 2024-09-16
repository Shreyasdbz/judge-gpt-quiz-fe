import mongoose from "mongoose";

export interface Profiles extends mongoose.Document {
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
const ProfileSchema = new mongoose.Schema<Profiles>({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  ageGroup: { type: String, required: true },
  educationLevel: { type: String, required: true },
  employmentStatus: { type: String, required: true },
  locale: { type: String, required: true },
  politicalAffiliation: { type: String, required: true },
  totalScore: { type: Number, required: true },
  servedArticles: { type: [String], required: true },
});

export default mongoose.models.Profile ||
  mongoose.model<Profiles>("Profile", ProfileSchema);
