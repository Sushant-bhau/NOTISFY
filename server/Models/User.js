const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userfirstName: {
    type: String,
    required: true,
  },
  userlastName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userMobile: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  userBio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
