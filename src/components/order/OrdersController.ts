import { NextFunction, Request, Response } from "express";
import Exception from "../exceptions/Exeption";
import ServerException from "../exceptions/ServerException";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";

export default class OrdersController {
    private readonly orderRepository: IOrderRepository;

    constructor() {
        this.orderRepository = new OrderMongoRepository();
        this.index = this.index.bind(this);
    }

    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = this.orderRepository.findMany({});
            res.status(200).json(orders);
        } catch (error: any) {
            next(new ServerException(error.message));
        }
    }
}
