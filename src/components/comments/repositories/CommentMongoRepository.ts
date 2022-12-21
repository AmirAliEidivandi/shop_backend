import { FilterQuery } from "mongoose";
import IComment from "../model/IComment";
import ICommentRepository from "./ICommentRepository";

export default class CommentMongoRepository implements ICommentRepository {
    findByProduct(productID: string): Promise<IComment[]> {
        throw new Error("Method not implemented.");
    }
    findOne(ID: string): Promise<IComment | null> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<IComment[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<IComment> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
