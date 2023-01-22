import { FilterQuery } from "mongoose";
import ObjectInterface from "../../contracts/ObjectInterface";
import IPagination from "../../contracts/IPagination";
import Comment from "../model/Comment";
import IComment from "../model/IComment";
import ICommentRepository from "./ICommentRepository";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import IUser from "../../users/model/IUser";

export default class CommentMongoRepository implements ICommentRepository {
    private readonly userRepository: IUserRepository;
    constructor() {
        this.userRepository = new UserMongoRepository();
    }

    public async findByProduct(productID: string, relations?: string[]) {
        const commentQuery = Comment.find({ product: productID });
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                commentQuery.populate(relation);
            });
        }
        return commentQuery.exec();
    }

    public async findOne(ID: string): Promise<IComment | null> {
        return Comment.findById(ID);
    }

    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IComment[]> {
        const commentQueryParams: ObjectInterface = {};
        if (params.user) {
            const users = await this.userRepository.findMany({
                $or: [{ firstName: { $regex: params.user } }, { lastName: { $regex: params.user } }, { email: { $regex: params.user } }],
            });
            commentQueryParams.user = { $in: users.map((user: IUser) => user._id) };
        }
        const commentQuery = Comment.find(commentQueryParams);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                commentQuery.populate(relation);
            });
        }
        if (pagination) {
            commentQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return commentQuery.exec();
    }

    public async create(params: any): Promise<IComment> {
        const newComment = new Comment({ ...params });
        return newComment.save();
    }

    public async updateOne(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<any> {
        return Comment.updateOne(where, updateData);
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
