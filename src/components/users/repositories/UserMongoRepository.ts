import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";
import IUser from "../model/IUser";
import User from "../model/User";
import IUserRepository from "./IUserRepository";

export default class UserMongoRepository implements IUserRepository {
    public async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    public async findOne(ID: string): Promise<IUser | null> {
        return User.findById(ID);
    }

    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IUser[]> {
        const userQuery = User.find();
        if (pagination) {
            userQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return userQuery.exec();
    }

    public async create(params: any): Promise<IUser> {
        const newUser = new User({ ...params });
        return newUser.save();
    }

    public async updateOne(where: FilterQuery<IUser>, updateData: Partial<IUser>): Promise<any> {
        return User.updateOne(where, updateData);
    }

    public async updateMany(where: FilterQuery<IUser>, updateData: Partial<IUser>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
