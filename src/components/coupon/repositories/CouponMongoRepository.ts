import { FilterQuery } from "mongoose";
import ICoupon from "../model/ICoupon";
import ICouponRepository from "./ICouponRepository";

export default class CouponMongoRepository implements ICouponRepository {
    findOne(ID: string): Promise<ICoupon | null> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<ICoupon[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<ICoupon> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: FilterQuery<ICoupon>, updateData: Partial<ICoupon>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: FilterQuery<ICoupon>, updateData: Partial<ICoupon>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}