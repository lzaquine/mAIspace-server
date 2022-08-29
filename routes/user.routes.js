const router = require("express").Router();
const User = require("../models/User.model");

router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});

router.put("/editprofile/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, email, field } = req.body;

  User.findByIdAndUpdate(id, {name, email, field}, { new: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

router.delete('/profile/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
  .then(() => res.status(200).json({message: `User ${user.name} deleted!`}))
  .catch((err) => res.json(err));
})


module.exports = router;