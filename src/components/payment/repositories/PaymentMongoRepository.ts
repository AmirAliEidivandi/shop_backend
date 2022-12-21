import { FilterQuery } from "mongoose";
import IPayment from "../model/IPayment";
import Payment from "../model/Payment";
import IPaymentRepository from "./IPaymentRepository";

export default class PaymentMongoRepository implements IPaymentRepository {
    public async findOne(ID: string): Promise<IPayment | null> {
        return Payment.findById(ID);
    }

    public async findMany(params: any): Promise<IPayment[]> {
        return Payment.find(params);
    }

    public async create(params: any): Promise<IPayment> {
        const newPayment = new Payment({ ...params });
        return newPayment.save();
    }

    public async updateOne(where: FilterQuery<IPayment>, updateData: Partial<IPayment>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updateMany(where: FilterQuery<IPayment>, updateData: Partial<IPayment>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
