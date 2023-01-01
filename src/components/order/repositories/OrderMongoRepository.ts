import { FilterQuery } from "mongoose";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "./IOrderRepository";
import Order from "../model/Order";

export default class OrderMongoRepository implements IOrderRepository {
    public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
        return Order.find({ status });
    }

    public async findOne(ID: string): Promise<IOrder | null> {
        return Order.findById(ID);
    }

    public async findMany(params: any, relations?: string[]): Promise<IOrder[]> {
        const orderQuery = Order.find(params);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                orderQuery.populate(relation);
            });
        }
        return orderQuery.exec()
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
