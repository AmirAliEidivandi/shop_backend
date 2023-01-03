import CouponHandler from "./CouponHandler";
import IUser from "components/users/model/IUser";
import ICoupon from "components/coupon/model/ICoupon";

export default abstract class AbstractCouponHandler implements CouponHandler {
    private nextHandler: CouponHandler | null = null;

    public setNext(handler: CouponHandler): CouponHandler {
        this.nextHandler = handler;
        return handler;
    }

    public process(coupon: ICoupon, user?: IUser): ICoupon | null {
        if (this.nextHandler) {
            return this.nextHandler.process(coupon, user);
        }
        return null;
    }
}
