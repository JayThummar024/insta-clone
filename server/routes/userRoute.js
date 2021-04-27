const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
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
            res.json({ messege: "Successfully Signedup" });
            console.log(result);
          })
          .catch((err) => console.log(err));
      });
    }
  });
});

module.exports = router;
