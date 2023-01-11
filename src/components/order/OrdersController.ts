import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import NotFoundException from "../exceptions/NotFoundException";
import IOrder from "./model/IOrder";
import OrderService from "./OrderService";
import OrderTransformer from "./OrderTransformer";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";

export default class OrdersController {
    private readonly ordersRepository: IOrderRepository;
    private readonly orderTransformer: OrderTransformer;
    private readonly orderService: OrderService;

    constructor() {
        this.ordersRepository = new OrderMongoRepository();
        this.orderTransformer = new OrderTransformer();
        this.orderService = new OrderService();
        this.index = this.index.bind(this);
        this.findOrder = this.findOrder.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const orders = await this.ordersRepository.findMany(
            {
                user: req.query.keyword as string,
            },
            ["user", "coupon"],
            {
                perPage,
                offset,
            }
        );
        const totalOrders = await this.ordersRepository.findMany({
            user: req.query.keyword as string,
        });
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
    });

    public findOrder = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const order = await this.ordersRepository.findOne(req.params.orderID, ["user", "coupon", "orderLines.product"]);
        if (!order) {
            throw new NotFoundException("سفارش مورد نظر یافت نشد");
        }
        res.status(200).json(this.orderTransformer.transform(order as IOrder));
    });

    public updateStatus = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.orderService
            .updateStatus(req.params.orderID, req.body.orderStatus)
            .then((result) => {
                if (result) {
                    res.send({
                        success: true,
                        message: "عملیات به روزرسانی با موفقیت انجام شد",
                    });
                }
            })
            .catch(next);
    });
}
