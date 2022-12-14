import { Schema, model } from "mongoose";
import addressSchema from "./Address";
import IUser from "./IUser";

const userSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    total_orders: {
        type: Number,
        default: 0,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    addresses: {
        type: [addressSchema],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default model<IUser>("User", userSchema);
