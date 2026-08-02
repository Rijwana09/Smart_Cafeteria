const express = require("express");

const router = express.Router();

const { protect,} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");
const { getAllOrders, getOrderDetails, updateOrderStatus, getDashboardStats,
} = require(
  "../controllers/adminController"
);

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


router.use(
  protect,
  authorizeRoles("admin")
);

router.get(
  "/orders",
  getAllOrders
);

router.get(
  "/orders/:id",
  getOrderDetails
);

router.patch(
  "/orders/:id/status",
  updateOrderStatus
);

router.get(
  "/dashboard-stats",
  getDashboardStats
);


module.exports = router;