import mongoose from "mongoose";

export interface Articles extends mongoose.Document {
  uid: string;
  createdAt: Date;
  title: string;
  content: string;
  isFake: boolean;
  source: string;
  modelInformation: string;
  localizedTitleEn?: string;
  localizedTitleFr?: string;
  localizedTitleEs?: string;
  localizedTitleDe?: string;
  localizedContentEn?: string;
  localizedContentFr?: string;
  localizedContentEs?: string;
  localizedContentDe?: string;
}

const ArticleSchema = new mongoose.Schema<Articles>({
  uid: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isFake: { type: Boolean, required: true },
  source: { type: String, required: true },
  modelInformation: { type: String, required: true },
  localizedTitleEn: { type: String },
  localizedTitleFr: { type: String },
  localizedTitleEs: { type: String },
  localizedTitleDe: { type: String },
  localizedContentEn: { type: String },
  localizedContentFr: { type: String },
  localizedContentEs: { type: String },
  localizedContentDe: { type: String },
});

export default mongoose.models.Article ||
  mongoose.model<Articles>("Article", ArticleSchema);
