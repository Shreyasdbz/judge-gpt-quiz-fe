import mongoose from "mongoose";

export interface Avatars extends mongoose.Document {
  name: string;
  data: Buffer;
}

/**
 * MongoDB schema for for collection "avatars"
 */
const AvatarSchema = new mongoose.Schema<Avatars>({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
});

export default mongoose.models.Avatar ||
  mongoose.model<Avatars>("Avatar", AvatarSchema);
