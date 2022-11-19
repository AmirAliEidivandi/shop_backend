import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

export default class UserHandler extends AbstractCouponHandler {
    public process(user: IUser, coupon: ICoupon): ICoupon | null {
        const { userConstraint } = coupon.constraints;
        if (user.id !== userConstraint.id) throw new Error("This discount code has not been issued for your user");

        return super.process(user, coupon);
    }
}
