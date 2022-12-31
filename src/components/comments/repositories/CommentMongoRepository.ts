import { FilterQuery } from "mongoose";
import Comment from "../model/Comment";
import IComment from "../model/IComment";
import ICommentRepository from "./ICommentRepository";

export default class CommentMongoRepository implements ICommentRepository {
    public async findOne(ID: string): Promise<IComment | null> {
        return Comment.findById(ID);
    }

    public async findMany(params: any): Promise<IComment[]> {
        return Comment.find(params);
    }

    public async create(params: any): Promise<IComment> {
        const newComment = new Comment({ ...params });
        return newComment.save();
    }

    public async updateOne(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updateMany(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
