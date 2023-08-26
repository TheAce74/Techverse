const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ticket_type: {
    type: String,
    required: false,
  },
  ticket_id: {
    type: String,
    required: false,
  },
  seat_number: {
    type: Number,
    required: false,
  },
  fullname: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("User", UserSchema);
