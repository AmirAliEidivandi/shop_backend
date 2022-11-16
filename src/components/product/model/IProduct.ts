import { Document } from "mongoose";
import IProductAttribute from "./IProductAttribute";
import ProductStatus from "./product.status";

export default interface IProduct extends Document {
    title: string;
    price: number;
    sale_price: number;
    thumbnail: string;
    gallery?: [string];
    product_category: number;
    attributes: [IProductAttribute];
    created_at: Date;
    updated_at: Date;
    status: ProductStatus;
}
