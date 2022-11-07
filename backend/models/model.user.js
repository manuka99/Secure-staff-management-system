/**
 * Database schema for user
 * with attributes name, email, password and user_type as worker or manager
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 100,
    },
    password: { type: String, required: true, min: 8 },
    user_type: {
      type: String,
      required: true,
      enum: ["worker", "manager"],
    },
  },
  { timestamps: true }
);

//Export user module
module.exports = User = mongoose.model("user", userSchema);
