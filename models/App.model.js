const { Schema, model } = require("mongoose");

const appSchema = new Schema(
    {
        appName: { type: String, },
        appDescription: { type: String, },
    },
    {
        timestamps: true,
    }
);

const App = model("App", appSchema);

module.exports = App;