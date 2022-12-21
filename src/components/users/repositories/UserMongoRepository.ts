import { FilterQuery } from "mongoose";
import IUser from "../model/IUser";
import IUserRepository from "./IUserRepository";

export default class UserMongoRepository implements IUserRepository {
    findOne(ID: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: FilterQuery<IUser>, updateData: Partial<IUser>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: FilterQuery<IUser>, updateData: Partial<IUser>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}