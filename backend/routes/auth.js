const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer setup to handle profile photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/profilePictures")); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route with multer middleware for file handling
router.post("/register", upload.single("profilePhoto"), register);
router.post("/login", login);

module.exports = router;
