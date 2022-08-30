const { Schema, model } = require("mongoose");

const appSchema = new Schema(
    {
        appName: { type: String, },
        appDescription: { type: String, },
        /* model: { 
            type: String,
            default: "text-davinci-002"
         }, */
/*         question: { type: String, }, */
/*         answer: { type: String, }, */
        temperature: {
            type: Number,
        },
        max_tokens: {
            type: Number,
        },
        prompt: { type: String }
        /* top_p: {
            type: Number,
            default: 0.95,
            max: 1,
            min: 0
        },
        frequency_penalty: {
            type: Number,
            default: 0.5,
            max: 1,
            min: 0
        },
        presence_penalty: {
            type: Number,
            default: 0.5,
            max: 1,
            min: 0
        } */
    },
    {
        timestamps: true,
    }
);

const App = model("App", appSchema);

module.exports = App;