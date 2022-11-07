const Message = require("../models/model.message");
const saveMsg = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { text } = req.body;
    const message = await Message.create({ userID, text });
    return res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSentMsgs = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const messages = await Message.find({ userID });
    return res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveMsg,
  getSentMsgs,
};
