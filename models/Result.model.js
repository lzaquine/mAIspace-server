const { Schema, model } = require('mongoose');

const resultsSchema = new Schema(
    {
        answer: [String], 
        question: [String],
        app: { type: Schema.Types.ObjectId, ref: 'App' },
    },
    {
        timestamps: true,
    }
);

const Result = model('Result', resultsSchema);

module.exports = Result;