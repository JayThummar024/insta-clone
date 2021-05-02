const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  requireLogin  = require("../middleware/requireLogin");
const Post = mongoose.model("Post")

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
          const { name, email, _id } = foundUser;
          res.json({ token, user: { name, email, _id } });
        }
      });
    }
  });
});

router.post("/createpost" , requireLogin , (req,res)=>{
  const {title , body} = req.body

  if(!title || !body){
    return res.status(422).json({error:"Please!! add all the fields"})
  }
   
  req.user.password = undefined
  const post = new Post({
    title,
    body,
    postedBy:req.user
  })

  post.save()
  .then(result=>res.json(result))
  .catch(err=>console.log(err))

})

router.get("/allposts", requireLogin , (req,res)=>{
  Post.find({})
  .populate("postedBy", "name _id")
  .then(result=>res.json(result))
  .catch(err=>console.log(err))
});

router.get("/myposts" , requireLogin ,(req,res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy" , "name _id")
  .then(result=>{
    res.json(result)
  })
  .catch(err=>console.log(err))
})

module.exports = router;
