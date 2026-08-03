const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin-only image upload for food items. Returns a URL the client can
// store on the Food document's `image` field.
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl });
  }
);

module.exports = router;
