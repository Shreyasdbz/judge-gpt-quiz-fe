import mongoose from "mongoose";

export interface Responses extends mongoose.Document {
  timestamp: Date;
  user_uid: string;
  article_uid: string;
  user_responded_is_human: number;
  user_responded_is_fake: number;
  time_to_respond: number;
  locale_responded_in: string;
}

const ResponseSchema = new mongoose.Schema<Responses>({
  timestamp: { type: Date, required: true },
  user_uid: { type: String, required: true },
  article_uid: { type: String, required: true },
  user_responded_is_human: { type: Number, required: true },
  user_responded_is_fake: { type: Number, required: true },
  time_to_respond: { type: Number, required: true },
  locale_responded_in: { type: String, required: true },
});

export default mongoose.models.Response ||
  mongoose.model<Responses>("Response", ResponseSchema);
