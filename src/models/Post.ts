import mongoose, { Schema, Document} from "mongoose";

export interface IPost extends Document {
  description: string;
  image: string;
}

const PostSchema: Schema = new Schema({
  description: { type: String, required: true },
  image: { type: String, required: true}
});

export default mongoose.model<IPost>('Post', PostSchema);
