const router = require("express").Router();
const storage = require("../database/multer");
const multer = require("multer");

const uploader = multer({ storage });

router.post("/api/upload/acta", uploader.single("mierda"), (req, res) => {
  try {
    console.log(req.file);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/upload/informe", uploader.single("file"), (req, res) => {
  try {
    console.log(req.file);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
