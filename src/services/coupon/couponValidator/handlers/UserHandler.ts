import ICoupon from "../../../../components/coupon/model/ICoupon";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

export default class UserHandler extends AbstractCouponHandler {
    public process(coupon: ICoupon, user?: IUser): ICoupon | null {
        // const { users } = coupon.constraints;

        if (coupon.constraints && "users" in coupon.constraints) {
            const { users } = coupon.constraints;
            if (user && users && users.length > 0 && !users.includes(user.id)) {
                throw new Error("این کد تخفیف برای کاربری شما صادر نشده است");
            }
        }
        return super.process(coupon, user);
    }
}
