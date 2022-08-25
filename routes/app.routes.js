const router = require("express").Router();
const App = require("../models/App.model");


router.get("/app", (req, res, next) => {
  App.find()
  //populate user?/results?
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

// To test this one, I need to populate the apps with results?
router.get("/app/:appId/:results", (req, res, next) => {
    const { appId, results } = req.params;
    
    Result.findById(appId, results)
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));
});

router.post("/app/:appId/:results", (req, res, next) => {
    const { appId, results } = req.params;
    const { userInput, appName, results: result } = req.body;
    
    Result.create({userInput, appName, result})
        .then((app) => res.status(200).json(app))
        .catch((err) => res.json(err));
})

module.exports = router;