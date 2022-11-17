import * as mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_URI}`);

mongoose.connection.on("open", () => console.log("mongo connection is open..."));
mongoose.connection.on("error", (err) => console.log(`failed to connect`, err.message));
