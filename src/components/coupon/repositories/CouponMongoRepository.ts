import { FilterQuery } from "mongoose";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import IPagination from "../../contracts/IPagination";
import ObjectInterface from "../../contracts/ObjectInterface";
import Coupon from "../model/Coupon";
import ICoupon from "../model/ICoupon";
import ICouponRepository from "./ICouponRepository";
import IUser from "../../users/model/IUser";

export default class CouponMongoRepository implements ICouponRepository {
    private readonly userRepository: IUserRepository;
    constructor() {
        this.userRepository = new UserMongoRepository();
    }

    public async findByCode(code: string): Promise<ICoupon | null> {
        return Coupon.findOne({ code });
    }

    public async findOne(ID: string): Promise<ICoupon | null> {
        return Coupon.findById(ID);
    }

    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<ICoupon[]> {
        const couponQuery = Coupon.find();
        if (pagination) {
            couponQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return couponQuery.exec();
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
