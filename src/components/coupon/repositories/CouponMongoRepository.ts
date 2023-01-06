import { FilterQuery } from "mongoose";
import Coupon from "../model/Coupon";
import ICoupon from "../model/ICoupon";
import ICouponRepository from "./ICouponRepository";

export default class CouponMongoRepository implements ICouponRepository {
    public async findByCode(code: string): Promise<ICoupon | null> {
        return Coupon.findOne({ code });
    }

    public async findOne(ID: string): Promise<ICoupon | null> {
        return Coupon.findById(ID);
    }

    public async findMany(params: any): Promise<ICoupon[]> {
        return Coupon.find(params);
    }

    public async create(params: any): Promise<ICoupon> {
        const newCoupon = new Coupon({ ...params });
        return newCoupon.save();
    }

    public async updateOne(where: FilterQuery<ICoupon>, updateData: Partial<ICoupon>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updateMany(where: FilterQuery<ICoupon>, updateData: Partial<ICoupon>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
