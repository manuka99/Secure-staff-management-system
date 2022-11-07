const uploadFileToGC = require("../common/uploadFileToGC");
const Upload = require("../models/model.upload");

const saveFile = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const {
      buffer,
      originalname: originalName,
      mimetype: mimeType,
      encoding,
      size: fileSize,
    } = req.file;
    const filePath = await uploadFileToGC(buffer);
    const upload = await Upload.create({
      userID,
      filePath,
      originalName,
      mimeType,
      encoding,
      fileSize,
    });
    return res.status(200).json({ upload });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUploadedFiles = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const uploads = await Upload.find({ userID });
    return res.status(200).json({ uploads });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveFile,
  getUploadedFiles,
};
