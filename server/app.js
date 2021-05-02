const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")

const app = express();
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB connected");
    }
  }
);

app.use(express.json())
app.use(cors())
require("./models/user")
require("./models/post")
app.use(require("./routes/userRoute"))


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
