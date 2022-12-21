import { FilterQuery } from "mongoose";
import IShipment from "../model/IShipment";
import IShipmentRepository from "./IShipmentRepository";

export default class ShipmentMongoRepository implements IShipmentRepository {
    findOne(ID: string): Promise<IShipment | null> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<IShipment[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<IShipment> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
