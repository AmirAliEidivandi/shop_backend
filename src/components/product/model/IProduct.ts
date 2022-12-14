import { Document } from "mongoose";
import IProductAttribute from "./IProductAttribute";
import ProductStatus from "./ProductStatus";

export default interface IProduct extends Document {
    title: string;
    price: number;
    thumbnail: string;
    gallery?: string[];
    category: string;
    attributes: IProductAttribute[];
    createdAt: Date;
    updatedAt: Date;
    stock: number;
    status: ProductStatus;
}
