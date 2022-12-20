import { Document } from "mongoose";
import IAttributeGroup from "./IAttributeGroup";
import IPriceVariation from "./IPriceVariation";
import IProductVariation from "./IProductVariation";
import ProductStatus from "./ProductStatus";

export default interface IProduct extends Document {
    title: string;
    price: number;
    discountedPrice: number;
    thumbnail?: string;
    thumbnailUrl?: string;
    gallery?: string[];
    galleryUrl?: string[];
    category: string;
    attributes: IAttributeGroup[];
    variations: IProductVariation[];
    priceVariations: IPriceVariation[];
    createdAt: Date;
    updatedAt: Date;
    stock: number;
    status: ProductStatus;
}
