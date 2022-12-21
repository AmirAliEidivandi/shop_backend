import { Schema, model } from "mongoose";
import IPayment from "./IPayment";
import PaymentStatus from "./PaymentStatus";

const paymentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    amount: { type: Number, required: true },
    method: { type: String },
    reserve: { type: String, required: true },
    reference: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: PaymentStatus, required: true, default: PaymentStatus.PENDING },
});

export default model<IPayment>("Payment", paymentSchema);
