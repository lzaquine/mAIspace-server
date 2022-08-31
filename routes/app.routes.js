const router = require("express").Router();
const App = require("../models/App.model");
const axios = require("axios");
const User = require("../models/User.model");
const Result = require("../models/Result.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");


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

router.post("/app/:appName", isAuthenticated, async (req, res, next) => {
  const { appName } = req.params;
  const { question } = req.body;
  const user = req.payload;

  let app = await App.findOne({ appName });

  try {
    let myPrompt = `
  "${app.prompt} ${question}`;

    let body = {
      prompt: myPrompt,
      temperature: app.temperature,
      max_tokens: app.max_tokens,
    };
    

    let openAi = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-002/completions`,
      body,
      {
        headers: { Authorization: `Bearer ${process.env.OPEN_AI_TOKEN}` },
      }
    );
    let answer = (openAi.data.choices[0].text)
    res.json(answer);

    const createdResults = await Result.create({answer: answer, question: question, app: app._id})

    const newResult = await Result.findById(createdResults._id)
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          results: 
            newResult._id,

        },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

