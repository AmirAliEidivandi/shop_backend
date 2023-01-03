import IPagination from "Components/contracts/IPagination";
import IRepository from "Components/contracts/IRepository";
import IUser from "Components/users/model/IUser";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";

export default interface IOrderRepository extends IRepository<IOrder> {
    findByStatus(status: OrderStatus): Promise<IOrder[]>;
    findByUserDetails(userParams: Partial<IUser>, relations?: string[], pagination?: IPagination): Promise<IOrder[]>;
}
