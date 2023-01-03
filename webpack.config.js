const path = require("path");

module.exports = {
    // configuration options for how webpack resolves modules
    resolve: {
        alias: {
            // add as many aliases as you like!
            Components: path.resolve(__dirname, "src/components"),
            Services: path.resolve(__dirname, "src/services"),
            Infrastructure: path.resolve(__dirname, "src/infrastructure"),
        },
    },
    // ... rest of your config
};
