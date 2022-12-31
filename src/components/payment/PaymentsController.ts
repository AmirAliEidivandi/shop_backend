import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";

export default class PaymentsController {
    private readonly paymentRepository: IPaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentMongoRepository();
    }
}
