import * as mongoose from "mongoose";

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`);

mongoose.connection.on("open", () => console.log("mongo connection is open..."));
mongoose.connection.on("error", (err) => console.log(`failed to connect`, err.message));
