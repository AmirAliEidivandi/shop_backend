import { Schema, model } from "mongoose";
import IProductCategory from "./IProductCategory";
import IProductAttribute from "./IProductAttribute";

const productCategorySchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    total_products: {
        type: Number,
        default: 0,
    },
    attributes: {
        type: [Object],
    }
});

export default model<IProductCategory>("Product", productCategorySchema);
