import { Schema, model } from "mongoose";
import IProduct from "./IProduct";
import ProductStatus from "./ProductStatus";

const productSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    thumbnail: { type: String },
    gallery: { type: [String] },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    attributes: { type: [Object], required: true },
    variations: { type: [Object] },
    priceVariations: { type: [Object] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    stock: { type: Number, default: 0 },
    status: { type: Number, default: ProductStatus.INIT },
});

export default model<IProduct>("Product", productSchema);
