const express = require("express");
const multer = require("multer");
const controller = require("../controllers/controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.get("/", controller.home);
router.post("/upload", upload.single("csvFile"), controller.upload);
router.get("/details/:name", controller.details);
router.get("/delete/:fileName", controller.delete);

module.exports = router;
