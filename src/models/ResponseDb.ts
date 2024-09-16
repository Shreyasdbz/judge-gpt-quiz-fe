import mongoose from "mongoose";

export interface Responses extends mongoose.Document {
  timestamp: Date;
  userUid: string;
  articleUid: string;
  userRespondedIsHuman: boolean;
  userRespondedIsFake: boolean;
  timeToRespond: number;
}

const ResponseSchema = new mongoose.Schema<Responses>({
  timestamp: { type: Date, required: true },
  userUid: { type: String, required: true },
  articleUid: { type: String, required: true },
  userRespondedIsHuman: { type: Boolean, required: true },
  userRespondedIsFake: { type: Boolean, required: true },
  timeToRespond: { type: Number, required: true },
});

export default mongoose.models.Response ||
  mongoose.model<Responses>("Response", ResponseSchema);
