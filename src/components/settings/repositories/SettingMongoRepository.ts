import { FilterQuery } from "mongoose";
import ISetting from "../model/ISetting";
import ISettingRepository from "./ISettingRepository";

export default class SettingMongoRepository implements ISettingRepository {
    findOne(ID: string): Promise<ISetting | null> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<ISetting[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<ISetting> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: FilterQuery<ISetting>, updateData: Partial<ISetting>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: FilterQuery<ISetting>, updateData: Partial<ISetting>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
