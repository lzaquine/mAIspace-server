const router = require("express").Router();
const User = require("../models/User.model");
const express = require("express");
const fileUploader = require("../config/cloudinary.config");

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

//GET PROFILE

router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});

// PUT EDIT PROFILE

router.put("/editprofile/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, email, field } = req.body;

  User.findByIdAndUpdate(id, {name, email, field}, { new: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

// DELETE PROFILE

router.delete('/profile/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
  .then(() => res.status(200).json({message: `User ${user.name} deleted!`}))
  .catch((err) => res.json(err));
})


module.exports = router;