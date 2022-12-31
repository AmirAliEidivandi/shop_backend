import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import CouponHandler from "./CouponHandler";

abstract class AbstractCouponHandler implements CouponHandler {
    private nextHandler: CouponHandler | null = null;

    public setNext(handler: CouponHandler): CouponHandler {
        this.nextHandler = handler;
        return handler;
    }

    public process(user: IUser, coupon: ICoupon): ICoupon | null {
        if (this.nextHandler) {
            return this.nextHandler.process(user, coupon);
        }
        return null;
    }
}

export default AbstractCouponHandler;