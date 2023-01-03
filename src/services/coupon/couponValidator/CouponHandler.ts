import ICoupon from "components/coupon/model/ICoupon";
import IUser from "components/users/model/IUser";

export default interface CouponHandler {
    setNext(handler: CouponHandler): CouponHandler;
    process(coupon: ICoupon, user?: IUser): ICoupon | null;
}
