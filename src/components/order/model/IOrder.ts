import { Document } from "mongoose";
import IAddress from "../../users/model/IAddress";
import IOrderLine from "./IOrderLine";
import OrderStatus from "./OrderStatus";

export default interface IOrder extends Document {
    user: string;
    totalPrice: number;
    finalPrice: number;
    orderLines: IOrderLine[];
    deliveryAddress: IAddress;
    coupon: string;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
}
