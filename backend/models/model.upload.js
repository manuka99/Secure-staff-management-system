/**
 * Database schema for message
 * with attributes userID, text
 */

const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const uploadSchema = new Schema(
  {
    userID: {
      type: ObjectId,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Export user module
const Upload = model("upload", uploadSchema);
module.exports = Upload;
