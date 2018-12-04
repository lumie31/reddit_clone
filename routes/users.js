const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("./helpers/auth");

//Users Index
router.get("/", auth.requireLogin, (req, res, next) => {
  User.find({}, "username", (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render("users/index", { users });
    }
  });
});

//Users new
router.get("/new", (req, res, next) => {
  res.render("users/new");
});

//Users create
router.post("/", (req, res, next) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      return res.redirect("/users");
    }
  });
});

module.exports = router;
