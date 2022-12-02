import { model, Schema } from "mongoose";
import CategoryInterface from "./ICategory";

const categorySchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    groups: {
        type: [Object],
    },
});

export default model<CategoryInterface>("Category", categorySchema);
