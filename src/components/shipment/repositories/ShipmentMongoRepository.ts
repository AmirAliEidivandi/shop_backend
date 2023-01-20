import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import ObjectInterface from "../../contracts/ObjectInterface";
import IUser from "../../users/model/IUser";
import IShipment from "../model/IShipment";
import Shipment from "../model/Shipment";
import IShipmentRepository from "./IShipmentRepository";

export default class ShipmentMongoRepository implements IShipmentRepository {
    private readonly usersRepository: IUserRepository;
    constructor() {
        this.usersRepository = new UserMongoRepository();
    }
    public async findOne(ID: string): Promise<IShipment | null> {
        return Shipment.findById(ID);
    }

    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IShipment[]> {
        const shipmentQueryParams: ObjectInterface = {};
        if (params.user) {
            const users = await this.usersRepository.findMany({
                $or: [{ firstName: { $regex: params.user } }, { lastName: { $regex: params.user } }, { email: { $regex: params.user } }],
            });
            shipmentQueryParams.employee = { $in: users.map((user: IUser) => user._id) };
        }
        const shipmentQuery = Shipment.find(shipmentQueryParams);
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                shipmentQuery.populate(relation);
            });
        }
        if (pagination) {
            shipmentQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return shipmentQuery.exec();
    }

    public async create(params: any): Promise<IShipment> {
        const newShipment = new Shipment({ ...params });
        return newShipment.save();
    }

    public async updateOne(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<any> {
        return Shipment.updateOne(where, updateData)
    }

    public async updateMany(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
