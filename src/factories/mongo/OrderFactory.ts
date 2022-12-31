import { faker } from "@faker-js/faker";
import IOrder from "../../components/order/model/IOrder";
import IOrderLine from "../../components/order/model/IOrderLine";
import Order from "../../components/order/model/Order";
import OrderStatus from "../../components/order/model/OrderStatus";
import { create as createUser } from "./UserFactory";
import { create as createProduct } from "./ProductFactory";
import { create as createCoupon } from "./CouponFactory";

faker.setLocale("fa");
const buildOrderLines = async (count: number = 1) => {
    const orderLines: Partial<IOrderLine>[] = [];
    for (let i = 1; i <= count; i++) {
        const product = await createProduct(1);
        orderLines.push({
            product: product[0]._id,
            price: product[0].price,
            discountedPrice: product[0].discountedPrice,
            count: faker.datatype.number(4) + 1,
        });
    }
    return orderLines;
};

export async function create(count: number = 1, params?: Partial<IOrder>) {
    const orders: IOrder[] = [];
    for (let index = 1; index <= count; index++) {
        const user = await createUser(1);
        const orderLines = await buildOrderLines(faker.datatype.number(6) + 1);
        const coupon = Math.random() > 0.5 ? await createCoupon(1) : null;
        const defaultParams = {
            user: user[0]._id,
            totalPrice: orderLines.reduce<number>((total: number, current: Partial<IOrderLine>) => total + current.price!, 0),
            finalPrice: orderLines.reduce<number>((total: number, current: Partial<IOrderLine>) => total + current.discountedPrice!, 0),
            orderLines: orderLines,
            deliveryAddress: user[0].addresses[0],
            coupon: coupon ? coupon[0]._id : null,
            status: faker.helpers.arrayElement([OrderStatus.CANCELED, OrderStatus.DELIVERED, OrderStatus.PAID_IN_PROGRESS, OrderStatus.PENDING, OrderStatus.REFUNDED]),
        };
        const orderParams = { ...defaultParams, ...params };
        const newOrder = new Order(orderParams);
        await newOrder.save();
        orders.push(newOrder);
    }
    return orders;
}
