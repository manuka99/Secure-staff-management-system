const controller_upload = require("../controllers/controller.upload");
const auth = require("../middleware/auth");
const multer = require("multer");
const isWithRoles = require("../middleware/isWithRoles");
const UserRoles = require("../enum/User.enum");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports = function (router) {
  router.get(
    "/upload",
    auth,
    isWithRoles([UserRoles.MANAGER]),
    controller_upload.getUploadedFiles
  );
  router.post("/upload", auth, isWithRoles([UserRoles.MANAGER]), (req, res) =>
    upload.single("file")(req, res, function (err) {
      if (err) return res.status(400).json({ msg: err.message });
      return controller_upload.saveFile(req, res);
    })
  );
  return router;
};
