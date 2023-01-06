import { faker } from "@faker-js/faker";
import ICoupon from "../../components/coupon/model/ICoupon";
import CouponStatus from "../../components/coupon/model/CouponStatus";
import Coupon from "../../components/coupon/model/Coupon";

// faker.setLocale('fa')
export async function create(count: number = 1, params?: Partial<ICoupon>) {
    const coupons: ICoupon[] = [];
    for (let index = 1; index <= count; index++) {
        const defaultParams = {
            code: faker.random.alphaNumeric(10),
            percent: faker.datatype.number(99) + 1,
            limit: faker.datatype.number(100) + 1,
            used: 0,
            expiresAt: faker.date.future().toLocaleDateString(),
            constraints: {},
            status: faker.helpers.arrayElement([CouponStatus.ACTIVE, CouponStatus.INACTIVE]),
        };
        const couponParams = { ...defaultParams, ...params };
        const newCoupon = new Coupon(couponParams);
        await newCoupon.save();
        coupons.push(newCoupon);
    }
    return coupons;
}
