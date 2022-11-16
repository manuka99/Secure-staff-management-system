const controller_msg = require("../controllers/controller.msg");
const UserRoles = require("../enum/User.enum");
const auth = require("../middleware/auth");
const isWithRoles = require("../middleware/isWithRoles");
module.exports = function (router) {
  router.get(
    "/message",
    auth,
    isWithRoles([UserRoles.MANAGER, UserRoles.WORKER]),
    controller_msg.getSentMsgs
  );
  router.post(
    "/message",
    auth,
    isWithRoles([UserRoles.MANAGER, UserRoles.WORKER]),
    controller_msg.saveMsg
  );
  return router;
};