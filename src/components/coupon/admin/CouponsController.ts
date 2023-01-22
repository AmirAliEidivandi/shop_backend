import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../services/CatchAsync";
import CouponTransformer from "./CouponTransformer";
import CouponMongoRepository from "../repositories/CouponMongoRepository";
import ICouponRepository from "../repositories/ICouponRepository";

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
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const coupons = await this.couponsRepository.findMany({}, [], { perPage, offset });
        const totalCoupons = await this.couponsRepository.findMany({});
        const transformedCoupons = this.couponTransformer.collection(coupons);
        res.status(200).json({
            data: transformedCoupons,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalCoupons.length / perPage),
                totalItems: totalCoupons.length,
            },
        });
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
