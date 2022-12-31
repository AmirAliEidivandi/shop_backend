import { Schema } from "mongoose";

const addressSchema: Schema = new Schema({
    title: { type: String, requried: true },
    state: { type: String, requried: true },
    city: { type: String, requried: true },
    address: { type: String, requried: true },
    zipCode: { type: String },
    fullName: { type: String, requried: true },
    mobile: { type: String, requried: true },
});

export default addressSchema;
