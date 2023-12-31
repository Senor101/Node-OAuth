const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    // required: true,
  },
  password: {
    type: String,
    trim: true,
  },
  provider: {
    type: String,
    default: "local",
    required: true,
  },
  providerId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
