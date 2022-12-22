import { FilterQuery } from "mongoose";
import ISetting from "../model/ISetting";
import Setting from "../model/Setting";
import ISettingRepository from "./ISettingRepository";

export default class SettingMongoRepository implements ISettingRepository {
    public async findOne(ID: string): Promise<ISetting | null> {
        return Setting.findById(ID);
    }

    public async findMany(params: any): Promise<ISetting[]> {
        return Setting.find(params);
    }

    public async create(params: any): Promise<ISetting> {
        const newSetting = new Setting({ ...params });
        return newSetting.save();
    }
    
    public async updateOne(where: FilterQuery<ISetting>, updateData: Partial<ISetting>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updateMany(where: FilterQuery<ISetting>, updateData: Partial<ISetting>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
