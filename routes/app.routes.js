const router = require("express").Router();
const App = require("../models/App.model");
const axios = require("axios");
const User = require("../models/User.model");


// ALL APPS
router.post("/app", (req, res, next) => {
  const { appName, appDescription, prompt, temperature, max_tokens } = req.body;
  App.create({
    appName,
    appDescription,
    prompt,
    temperature,
    max_tokens,
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

  App.findOne({ appName: appName })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

// CALL API

router.post("/app/:appName", async (req, res, next) => {
  const { appName } = req.params;
  const { question } = req.body;

  let app = await App.findOne({ appName });

  try {
    let myPrompt = `
  "${app.prompt} ${question}`;

    let body = {
      prompt: myPrompt,
      temperature: app.temperature,
      max_tokens: app.max_tokens,
    };
    
    console.log(question);
    let openAi = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-002/completions`,
      body,
      {
        headers: { Authorization: `Bearer ${process.env.OPEN_AI_TOKEN}` },
      }
    );
    let answer = (openAi.data.choices[0].text)
    res.json(answer);

    await App.findOneAndUpdate(
      appName, 
      { $push: { answer: answer } },
      )
      
    console.log(answer);
  } catch (error) {
    console.log(error);
  }
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
