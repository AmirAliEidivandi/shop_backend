import { config as loadEnvironmentsVars } from "dotenv";
import startMongoose from "./infrastructure/connections/mongoose";
import { Command } from "commander";
import { create as userFactory } from "./src/factories/mongo/UserFactory";
const clear = require("clear");

loadEnvironmentsVars();
startMongoose();
clear();
const program = new Command();
program.version("v1.0.0").description("a cli tool for shop project");
program
    .command("factory <model>")
    .description("Run model factory")
    .option("-c, --count <count>", "count of records that must be created")
    .action((model, options) => {
        switch (model) {
            case "user":
                userFactory(options.count)
                    .then((users) => {})
                    .catch((err) => console.log(err.message));
                break;
        }
    });
program.parse(process.argv);
