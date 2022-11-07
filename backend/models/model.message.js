/**
 * Database schema for message
 * with attributes userID, text
 */

const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const messageSchema = new Schema(
  {
    userID: {
      type: ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export user module
const Message = model("message", messageSchema);
module.exports = Message;
