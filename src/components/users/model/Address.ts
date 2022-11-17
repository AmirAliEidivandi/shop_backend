import { Schema } from "mongoose";

const addressSchema: Schema = new Schema({
    title: {
        type: String,
        requried: true,
    },
    state: {
        type: String,
        requried: true,
    },
    city: {
        type: String,
        requried: true,
    },
    address: {
        type: String,
        requried: true,
    },
    zip_code: {
        type: String,
    },
    full_name: {
        type: String,
        requried: true,
    },
    mobile: {
        type: String,
        requried: true,
    },
});

export default addressSchema;
