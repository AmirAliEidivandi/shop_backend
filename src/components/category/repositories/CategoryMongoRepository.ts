import { FilterQuery } from "mongoose";
import Category from "../model/Category";
import ICategory from "../model/ICategory";
import ICategoryRepository from "./ICategoryRepository";

export default class CategoryMongoRepository implements ICategoryRepository {
    public async findOne(ID: string): Promise<ICategory | null> {
        return Category.findById(ID);
    }

    public async findMany(params: any): Promise<ICategory[]> {
        return Category.find(params);
    }

    public async create(params: any): Promise<ICategory> {
        const newCategory = new Category({ ...params });
        return newCategory.save();
    }

    public async updateOne(where: FilterQuery<ICategory>, updateData: Partial<ICategory>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updateMany(where: FilterQuery<ICategory>, updateData: Partial<ICategory>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
