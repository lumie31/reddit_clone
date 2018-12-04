const express = require("express");
const router = express.Router();
const User = require("../models/user");

// set layout variables
router.use(function(req, res, next) {
  res.locals.title = "Reddit, Clone";
  res.locals.currentUserId = req.session.userId;

  next();
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

//get login page
router.get("/login", (req, res, next) => {
  res.render("login");
});

//login route
router.post("/login", (req, res, next) => {
  console.log(req.session);
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;

      return res.redirect("/");
    }
  });
});

//logout
router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
    });
  }
  return res.redirect("/");
});

module.exports = router;
