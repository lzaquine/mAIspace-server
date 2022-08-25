const { Schema, model } = require('mongoose');

const resultsSchema = new Schema(
    {
        userInput: { type: String },
        results: { type: String },
        appName: { type: String },
    },
    {
        timestamps: true,
    }
);

const Result = model('Result', resultsSchema);

module.exports = Result;