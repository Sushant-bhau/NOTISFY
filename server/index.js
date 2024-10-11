const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();
const port = 6969;

app.use(cors());
app.use(bodyParser.json());

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("db connected ");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send(" server is running");
});

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
