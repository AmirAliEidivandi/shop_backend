import ICoupon from "components/coupon/model/ICoupon";
import IUser from "components/users/model/IUser";
import ExpireHandler from "./handlers/ExpireHandler";
import LimitHandler from "./handlers/LimitHandler";
import UserHandler from "./handlers/UserHandler";

export default class CouponValidator {
    public handle(coupon: ICoupon, user?: IUser) {
        const userHandler = new UserHandler();
        const limitHandler = new LimitHandler();
        const expireHandler = new ExpireHandler();

        userHandler.setNext(limitHandler).setNext(expireHandler);
        return userHandler.process(coupon, user);
    }
}
