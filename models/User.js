const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    tokenSecret: String,
    email: String,
  },
  displayName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
