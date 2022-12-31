import { Schema, model } from "mongoose";
import addressSchema from "./Address";
import IUser from "./IUser";

const userSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    totalOrders: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    password: { type: String },
    addresses: { type: [addressSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export default model<IUser>("User", userSchema);
