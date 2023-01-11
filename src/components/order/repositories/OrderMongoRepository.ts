import { FilterQuery } from "mongoose";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "./IOrderRepository";
import Order from "../model/Order";
import IPagination from "../../contracts/IPagination";
import IUser from "../../users/model/IUser";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import OrderQueryInterface from "../OrderQueryInterface";

export default class OrderMongoRepository implements IOrderRepository {
    private readonly usersRepository: IUserRepository;
    constructor() {
        this.usersRepository = new UserMongoRepository();
    }
    public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
        return Order.find({ status });
    }

    public async findOne(ID: string, relations?: string[]): Promise<IOrder | null> {
        const orderQuery = Order.findById(ID);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                orderQuery.populate(relation);
            });
        }
        return orderQuery.exec();
    }

    public async findMany(params: OrderQueryInterface, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
        const orderQueryParams: OrderQueryInterface = {};
        if (params.user) {
            const users = await this.usersRepository.findMany({
                $or: [{ firstName: { $regex: params.user } }, { lastName: { $regex: params.user } }, { email: { $regex: params.user } }],
            });
            orderQueryParams.user = { $in: users.map((user: IUser) => user._id) };
        }
        const orderQuery = Order.find(orderQueryParams);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                orderQuery.populate(relation);
            });
        }
        if (pagination) {
            orderQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return orderQuery.exec();
    }

    public async create(params: any): Promise<IOrder> {
        const newOrder = new Order({ ...params });
        return newOrder.save();
    }

    public async updateOne(where: FilterQuery<IOrder>, updateData: Partial<IOrder>): Promise<any | boolean> {
        return Order.updateOne(where, updateData);
    }

    public async updateMany(where: FilterQuery<IOrder>, updateData: Partial<IOrder>): Promise<boolean> {
        return true;
    }

    public async deleteOne(ID: string): Promise<boolean> {
        return true;
    }

    public async deleteMany(where: any): Promise<boolean> {
        return true;
    }
}
