import { NextFunction, Request, Response } from "express";
import OrderTransformer from "./OrderTransformer";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";

export default class OrdersController {
    private readonly ordersRepository: IOrderRepository;
    private readonly orderTransformer: OrderTransformer;

    constructor() {
        this.ordersRepository = new OrderMongoRepository();
        this.orderTransformer = new OrderTransformer();
        this.index = this.index.bind(this);
    }

    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await this.ordersRepository.findMany({});
            const transformedOrders = this.orderTransformer.collection(orders);
            res.status(200).json(transformedOrders);
        } catch (error) {
            next(error);
        }
    }
}
