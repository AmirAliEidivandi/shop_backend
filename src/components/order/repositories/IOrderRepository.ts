import IPagination from "../../contracts/IPagination";
import IRepository from "../../contracts/IRepository";
import IUser from "../../users/model/IUser";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";

export default interface IOrderRepository extends IRepository<IOrder> {
    findByStatus(status: OrderStatus): Promise<IOrder[]>;
    findByUserDetails(userParams: Partial<IUser>, relations?: string[], pagination?: IPagination): Promise<IOrder[]>;
}
