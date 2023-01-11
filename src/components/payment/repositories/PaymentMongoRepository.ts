import { FilterQuery } from "mongoose";
import IUser from "../../users/model/IUser";
import IPagination from "../../contracts/IPagination";
import IPayment from "../model/IPayment";
import Payment from "../model/Payment";
import IPaymentRepository from "./IPaymentRepository";
import ObjectInterface from "../../contracts/ObjectInterface";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";

export default class PaymentMongoRepository implements IPaymentRepository {
    private readonly userRepository: IUserRepository;
    constructor() {
        this.userRepository = new UserMongoRepository();
    }

    public async findByeReserve(reserve: string): Promise<IPayment | null> {
        return Payment.findOne({ reserve });
    }

    public async findOne(ID: string): Promise<IPayment | null> {
        return Payment.findById(ID);
    }

    public async findMany(params: ObjectInterface, relations?: string[], pagination?: IPagination): Promise<IPayment[]> {
        const paymentQueryParams: ObjectInterface = {};
        if (params.user) {
            const users = await this.userRepository.findMany({
                $or: [{ firstName: { $regex: params.user } }, { lastName: { $regex: params.user } }, { email: { $regex: params.user } }],
            });
            paymentQueryParams.user = { $in: users.map((user: IUser) => user._id) };
        }
        const paymentQuery = Payment.find(paymentQueryParams);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                paymentQuery.populate(relation);
            });
        }
        if (pagination) {
            paymentQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return paymentQuery.exec();
    }

    public async create(params: any): Promise<IPayment> {
        const newPayment = new Payment({ ...params });
        return newPayment.save();
    }

    public async updateOne(where: FilterQuery<IPayment>, updateData: Partial<IPayment>): Promise<any> {
        return Payment.updateOne(where, updateData);
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
