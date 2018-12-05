const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/room");
const Post = require("../models/post");

//require the comment controller
const commentsRouter = require("./comments");

// Posts new
router.get("/new", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    } else {
      res.render("posts/new", { room: room });
    }
  });
});

// Posts create
router.post("/", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    } else {
      let post = new Post(req.body);
      post.room = room;

      post.save((err, post) => {
        if (err) {
          console.error(err);
        }
        return res.redirect(`/rooms/${room._id}`);
      });
    }
  });
});

router.use("/:postId/comments", commentsRouter);

module.exports = router;
