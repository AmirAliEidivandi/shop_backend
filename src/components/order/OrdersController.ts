import { Request, Response } from "express";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";

export default class OrdersController {
    private readonly orderRepository: IOrderRepository;

    constructor() {
        this.orderRepository = new OrderMongoRepository();
    }

    public async index(req: Request, res: Response): Promise<void> {
        const orders = this.orderRepository.findMany({});
        res.status(200).json(orders);
    }
}
