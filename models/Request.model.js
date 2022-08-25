const { Schema, model } = require('mongoose');

const requestsSchema = new Schema(
    {
        userInput: { type: String },
        apiReturn: { type: String },
        appName: { type: String },
    },
    {
        timestamps: true,
    }
);

const Request = model('Request', requestsSchema);

module.exports = Request;