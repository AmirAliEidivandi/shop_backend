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
            const perPage = 10;
            const page = req.query.page || 1;
            const offset = ((page as number) - 1) * perPage;
            const orders = await this.ordersRepository.findMany({}, ["user", "coupon"], {
                perPage,
                offset,
            });
            const totalOrders = await this.ordersRepository.findMany({});
            const transformedOrders = this.orderTransformer.collection(orders);
            res.status(200).json({
                data: transformedOrders,
                _metadata: {
                    page,
                    perPage,
                    totalPages: Math.ceil(totalOrders.length / perPage),
                    totalItems: totalOrders.length,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
