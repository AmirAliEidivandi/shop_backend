import { FilterQuery } from "mongoose";
import IShipment from "../model/IShipment";
import Shipment from "../model/Shipment";
import IShipmentRepository from "./IShipmentRepository";

export default class ShipmentMongoRepository implements IShipmentRepository {
    public async findOne(ID: string): Promise<IShipment | null> {
        return Shipment.findById(ID);
    }

    public async findMany(params: any): Promise<IShipment[]> {
        return Shipment.find(params);
    }

    public async create(params: any): Promise<IShipment> {
        const newShipment = new Shipment({ ...params });
        return newShipment.save();
    }
    
    public async updateOne(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<any> {
        throw new Error("Method not implemented.");
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
