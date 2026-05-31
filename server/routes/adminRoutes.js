const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin"),
    (req, res) => {

        res.json({
            message:
                "Admin Dashboard",
        });

    }
);

module.exports = router;