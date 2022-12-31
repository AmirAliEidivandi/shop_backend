import { Schema, model } from "mongoose";
import AdviceToBuy from "./AdviceToBuy";
import CommentStatus from "./CommentStatus";
import IComment from "./IComment";

const commentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isBuyer: { type: Boolean, default: false },
    adviceToBuy: { type: Number, default: AdviceToBuy.NOT_SURE },
    status: { type: Number, default: CommentStatus.PENDING },
    createdAt: { type: Date, default: Date.now },
});

export default model<IComment>("Comment", commentSchema);
