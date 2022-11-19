import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import ExpireHandler from "./handlers/ExpireHandler";
import LimitHandler from "./handlers/LimitHandler";
import UserHandler from "./handlers/UserHandler";

export default class CouponValidator {
    public handle(user: IUser, coupon: ICoupon) {
        const userHandler = new UserHandler();
        const limitHandler = new LimitHandler();
        const expireHandler = new ExpireHandler();

        userHandler.setNext(limitHandler).setNext(expireHandler);
        return userHandler.process(user, coupon);
    }
}
