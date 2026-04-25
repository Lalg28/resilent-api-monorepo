import { IPost } from "@resilient/shared";
import { model, Schema } from "mongoose";

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    body: { type: String, required: true }
}, { timestamps: true })

export default model<IPost>('Post', postSchema)