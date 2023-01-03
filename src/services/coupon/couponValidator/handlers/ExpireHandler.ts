import ICoupon from "components/coupon/model/ICoupon";
import IUser from "components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

export default class ExpireHandler extends AbstractCouponHandler {
    public process(coupon: ICoupon, user: IUser): ICoupon | null {
        const now = new Date();
        if (now > coupon.expiresAt) throw new Error("مدت زمان استفاده از این کد تخفیف به پایان رسیده");
        return super.process(coupon, user);
    }
}
