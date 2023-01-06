import { faker } from "@faker-js/faker";
import PaymentStatus from "../../components/payment/model/PaymentStatus";
import IPayment from "../../components/payment/model/IPayment";
import Payment from "../../components/payment/model/Payment";
import { create as createUser } from "./UserFactory";
import { create as createOrder } from "./OrderFactory";

// faker.setLocale('fa')
export async function create(count: number = 1, params?: Partial<IPayment>) {
    const payments: IPayment[] = [];
    for (let index = 1; index <= count; index++) {
        const user = await createUser(1);
        const order = await createOrder(1);
        const defaultParams = {
            user: user[0]._id,
            order: order[0]._id,
            amount: order[0].finalPrice,
            method: "online",
            reserve: faker.random.alphaNumeric(15),
            reference: faker.random.alphaNumeric(15),
            status: faker.helpers.arrayElement([PaymentStatus.FAILED, PaymentStatus.PENDING, PaymentStatus.SUCCESS]),
        };
        const finalParams = { ...defaultParams, ...params };
        const newPayment = new Payment(finalParams);
        await newPayment.save();
        payments.push(newPayment);
    }
    return payments;
}
