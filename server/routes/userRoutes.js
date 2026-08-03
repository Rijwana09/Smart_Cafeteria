const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const {
    updateProfile,
    getFavorites,
    toggleFavorite,
} = require("../controllers/userController");

router.get(
    "/profile",
    protect,
    (req, res) => {

        res.json(req.user);

    }
);

router.put(
    "/profile",
    protect,
    updateProfile
);

router.get(
    "/favorites",
    protect,
    getFavorites
);

router.post(
    "/favorites/:foodId",
    protect,
    toggleFavorite
);

module.exports = router;
