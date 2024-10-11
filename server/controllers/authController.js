const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const multer = require("multer");
const cloudinary = require("cloudinary");
require("dotenv").config();
const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
});
const signup = async (req, res) => {
  try {
    const {
      userfirstName,
      userlastName,
      userBio,
      userEmail,
      userMobile,
      userName,
      userPassword,
    } = req.body;

    // if currentuser exists

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(401).send("User Already Exists with this email");
    }

    // check if profile image is provided
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a profile image",
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const password = req.body.userPassword;
    const router = express.Router();
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    console.log("Request Body:", req.body);

    const newUser = new User({
      userfirstName,
      userlastName,
      userBio,
      userEmail,
      userMobile,
      userName,
      userPassword: encryptedPassword,
      profileImage: result.secure_url,
    });
    await newUser.save();
    return res.status(200).json({
      status: "ok",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail }); // User.findOne
    if (user) {
      const passwordMatch = await bcrypt.compare(
        userPassword,
        user.userPassword
      );
      if (passwordMatch) {
        return res.json(user);
      } else {
        return res.status(401).send("Invalid email or password");
      }
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { signup, login };
