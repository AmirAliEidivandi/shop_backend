import ICoupon from "../../../../components/coupon/model/ICoupon";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

export default class LimitHandler extends AbstractCouponHandler {
    public process(coupon: ICoupon, user?: IUser): ICoupon | null {
        if (coupon.used >= coupon.limit) throw new Error("تعداد استفاده از این کد تخفیف به پایان رسیده");
        return super.process(coupon, user);
    }
}
