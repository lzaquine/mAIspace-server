const router = require("express").Router();
const App = require("../models/App.model");
const axios = require("axios");
const User = require("../models/User.model");

// ALL APPS
router.post("/app", (req, res, next) => {
  const { appName, appDescription } = req.body; 
  App.create({
    appName,
    appDescription,
  })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

router.get("/app", (req, res, next) => {
  App.find() 
    .then((apps) => res.status(200).json(apps))
    .catch((err) => res.json(err));
});

// ONE APP

router.get("/app/:appName", (req, res, next) => {
  const { appName } = req.params;

  App.findOne({appName: appName})
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

router.post("/app/:appName", (req, res, next) => {
  const { appName } = req.params;
  const { question } = req.body;

  // fazer uma rota pra cada app, com o nome da app e outras infos, chamar api em cada uma delas.
  //question/prompt 

  App.findOne({ appName })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));

  let myPrompt = `
  "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: ${user.question}`

  let body = {
    prompt: myPrompt,
    temperature: 1,
    max_tokens: 200,
  }

  let openAi = axios.post(
    `https://api.openai.com/v1/completions`,
    body,
    {
      headers: { Authorization: `Bearer ${process.env.OPEN_AI_TOKEN}`, },
    }
  );

  let answer = openAi.data.choices[0].text;
}
);

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
