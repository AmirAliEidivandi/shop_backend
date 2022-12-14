import { Document } from "mongoose";
import IAttributeCategory from "./IAttributeCategory";

export default interface CategoryInterface extends Document {
    title: string;
    slug: string;
    groups: IAttributeCategory[];
}
