const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/room");
const Post = require("../models/post");
const Comment = require("../models/comment");

//comments new
router.get("/new", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    } else {
      Post.findById(req.params.postId, function(err, post) {
        if (err) {
          console.error(err);
        }
        res.render("comments/new", { post: post, room: room });
      });
    }
  });
});

module.exports = router;
