import * as mongoose from "mongoose";

mongoose.connection.on("open", () => console.log("mongo connection is open..."));
mongoose.connection.on("error", (err) => console.log(`failed to connect`, err.message));

const startMongoose = () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
        console.log(error);
    }
};

export default startMongoose;
