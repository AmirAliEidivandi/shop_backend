import { FilterQuery } from "mongoose";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "./IOrderRepository";
import Order from "../model/Order";
import IPagination from "Components/contracts/IPagination";
import IUser from "Components/users/model/IUser";
import IUserRepository from "Components/users/repositories/IUserRepository";
import UserMongoRepository from "Components/users/repositories/UserMongoRepository";
export default class OrderMongoRepository implements IOrderRepository {
    private readonly usersRepository: IUserRepository;
    constructor() {
        this.usersRepository = new UserMongoRepository();
    }
    public async findByUserDetails(userParams: Partial<IUser>, relations?: string[] | undefined, pagination?: IPagination | undefined): Promise<IOrder[]> {
        const users = await this.usersRepository.findMany({
            $or: [{ firstName: { $regex: userParams.firstName } }, { lastName: { $regex: userParams.lastName } }, { email: { $regex: userParams.email } }],
        });
        return this.findMany({ user: { $in: users.map((user: IUser) => user._id) } }, relations, pagination);
    }

    public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
        return Order.find({ status });
    }

    public async findOne(ID: string): Promise<IOrder | null> {
        return Order.findById(ID);
    }

    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
        const orderQuery = Order.find(params);
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
