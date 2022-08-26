const router = require("express").Router();
const App = require("../models/App.model");
const User = require("../models/User.model");
const axios = require("axios");

let openAi = axios.create({
    baseURL: 'https://api.openai.com/v1/completions',
    headers: {'Authorization': 'Bearer ' + process.env.OPEN_AI_TOKEN}
});

router.get("/app", (req, res, next) => {
  App.find()
    .then((apps) => res.status(200).json(apps))
    .catch((err) => res.json(err));
});

router.post("/app", (req, res, next) => {
    const { appName, appDescription, model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } = req.body;
    
    App.create({ appName, appDescription, model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty })
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));
});

router.get("/app/:appId", (req, res, next) => {
    const { appId } = req.params;
    
    App.findById(appId)
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));
});


/* router.get("/app/:appId/:results", (req, res, next) => {
    const { appId, results } = req.params;
    
    Result.findById(appId, results)
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));
});

router.post("/app/:appId/:results", (req, res, next) => {
    const { appId, results } = req.params;
    const { userInput, results: result } = req.body;

    Result.create({ userInput, results: result })
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));

    App.findById(appId, { $push: { results: { userInput, result } } })
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));

    User.findByIdAndUpdate(result, { $push: { results: { userInput, result } } })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.json(err));

}) */

module.exports = router;


/* App.findOne(appName)
        .then((app) => {
        app.results.push({ userInput, result });
        app.save()
        .then((app) => res.status(200).json(app))
        }).catch((err) => res.json(err));
    
    Result.create({userInput, appName, result})
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err)); */