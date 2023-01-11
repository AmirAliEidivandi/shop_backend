import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import CouponTransformer from "./CouponTransformer";
import CouponMongoRepository from "./repositories/CouponMongoRepository";
import ICouponRepository from "./repositories/ICouponRepository";

export default class CouponsController {
    private readonly couponsRepository: ICouponRepository;
    private readonly couponTransformer: CouponTransformer;
    constructor() {
        this.couponsRepository = new CouponMongoRepository();
        this.couponTransformer = new CouponTransformer();
        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const coupons = await this.couponsRepository.findMany({});
        res.status(200).json(this.couponTransformer.collection(coupons));
    });
    public store = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newCoupon = await this.couponsRepository.create({
            code: req.body.code,
            percent: req.body.percent,
            limit: req.body.limit,
            expiresAt: req.body.expiresAt,
            constraints: req.body.constraints,
        });

        if (newCoupon) {
            res.status(201).json({
                success: true,
                message: "کد تخفیف با موفقیت ایجاد شد",
            });
        }
    });
}
