import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import PaymentTransformer from "./PaymentTransformer";
import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";

export default class PaymentsController {
    private readonly paymentRepository: IPaymentRepository;
    private readonly paymentTransformer: PaymentTransformer;
    constructor() {
        this.paymentRepository = new PaymentMongoRepository();
        this.paymentTransformer = new PaymentTransformer();
        this.index = this.index.bind(this);
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const payments = await this.paymentRepository.findMany({}, ["user", "order"], { perPage, offset });
        const transformedPayments = this.paymentTransformer.collection(payments);
        const totalPayments = await this.paymentRepository.findMany({});
        res.status(200).json({
            data: transformedPayments,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalPayments.length / perPage),
                totalItems: totalPayments.length,
            },
        });
    });
}
