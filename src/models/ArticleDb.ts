import mongoose from "mongoose";

export interface Articles extends mongoose.Document {
  uid: string;
  created_at: Date;
  headline: string;
  detail: string;
  content: string;
  is_fake: boolean;
  style_or_source: string;
  origin_locale: string;
  headline_model_used: string;
  content_model_used: string;
  translation_model_used: string;
  localized_headline_en: string;
  localized_detail_en: string;
  localized_content_en: string;
  localized_headline_es: string;
  localized_detail_es: string;
  localized_content_es: string;
  localized_headline_fr: string;
  localized_detail_fr: string;
  localized_content_fr: string;
  localized_headline_de: string;
  localized_detail_de: string;
}

const ArticleSchema = new mongoose.Schema<Articles>({
  uid: { type: String, required: true },
  created_at: { type: Date, required: true },
  headline: { type: String, required: true },
  detail: { type: String, required: true },
  content: { type: String, required: true },
  is_fake: { type: Boolean, required: true },
  style_or_source: { type: String, required: true },
  origin_locale: { type: String, required: true },
  headline_model_used: { type: String, required: true },
  content_model_used: { type: String, required: true },
  translation_model_used: { type: String, required: true },
  localized_headline_en: { type: String, required: true },
  localized_detail_en: { type: String, required: true },
  localized_content_en: { type: String, required: true },
  localized_headline_es: { type: String, required: true },
  localized_detail_es: { type: String, required: true },
  localized_content_es: { type: String, required: true },
  localized_headline_fr: { type: String, required: true },
  localized_detail_fr: { type: String, required: true },
  localized_content_fr: { type: String, required: true },
  localized_headline_de: { type: String, required: true },
  localized_detail_de: { type: String, required: true },
});

export default mongoose.models.Article ||
  mongoose.model<Articles>("Article", ArticleSchema);
