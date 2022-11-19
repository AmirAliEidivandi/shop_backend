import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

export default class ExpireHandler extends AbstractCouponHandler {
    public process(user: IUser, coupon: ICoupon): ICoupon | null {
        const now = new Date();
        if (now > coupon.expires_at) throw new Error("This coupon has expired");
        return super.process(user, coupon);
    }
}