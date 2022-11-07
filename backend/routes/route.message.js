const controller_msg = require("../controllers/controller.msg");
const auth = require("../middleware/auth");
module.exports = function (router) {
  router.get("/message", auth, controller_msg.getSentMsgs);
  router.post("/message", auth, controller_msg.saveMsg);
  return router;
};
