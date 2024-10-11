const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = "./files";
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// routes
router.post("/upload", upload.single("file"), notesController.upload);
router.get("/getfiles", notesController.getNote);
router.get("/get/:id", notesController.getNoteById);
router.delete("/delete/:id", notesController.delete);

module.exports = router;
