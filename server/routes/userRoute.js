const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please! add all the fields" });
  }

  User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      res.json({ messege: "user already exists!!!" });
    } else {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then((result) => {
            res.json({ message: "Successfully Signedup" });
          })
          .catch((err) => console.log(err));
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please! add all the fields" });
  }

  User.findOne({ email: email }, (err, foundUser) => {
    if (!foundUser) {
      res.status(422).json({ message: "Invalid Email or Password" });
    } else {
      bcrypt.compare(password, foundUser.password).then((match) => {
        if (match) {
          const token = jwt.sign(
            { _id: foundUser._id },
            process.env.JWT_SECRET
          );
          const { name, email, _id, followers, following } = foundUser;
          res.json({ token, user: { name, email, _id, followers, following } });
        }
      });
    }
  });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, photo } = req.body;

  if (!title || !body || !photo) {
    return res.status(422).json({ error: "Please!! add all the fields" });
  }

  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
    pic: photo,
  });

  post
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.get("/allposts", requireLogin, (req, res) => {
  Post.find({})
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "_id name")
    .then((result) => res.json({ posts: result }))
    .catch((err) => console.log(err));
});

router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "name _id")
    .then((result) => {
      res.json({ myposts: result });
    })
    .catch((err) => console.log(err));
});

router.put("/likes", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlikes", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

router.get("/profile/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            return res.json({ user, posts });
          }
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});
router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result );
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

module.exports = router;
