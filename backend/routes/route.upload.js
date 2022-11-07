const controller_upload = require("../controllers/controller.upload");
const auth = require("../middleware/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports = function (router) {
  router.get("/upload", auth, controller_upload.getUploadedFiles);
  router.post("/upload", auth, (req, res) =>
    upload.single("file")(req, res, function (err) {
      if (err) return res.status(400).json({ msg: err.message });
      return controller_upload.saveFile(req, res);
    })
  );
  return router;
};
