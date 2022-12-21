import { Document } from "mongoose";
import CouponStatus from "./CouponStatus";

export default interface ICoupon extends Document {
    code: string;
    amount: number;
    limit: number;
    used: number;
    expiresAt: Date;
    constraints: object;
    status: CouponStatus.ACTIVE;
}
