const express = require("express");

const router = express.Router();

const {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getAllFoodsAdmin,
} = require(
  "../controllers/foodController"
);

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", getFoods);

router.get(
  "/admin/all",
  protect,
  authorizeRoles("admin"),
  getAllFoodsAdmin
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createFood
);

router.get("/:id", getFoodById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateFood
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteFood
);

module.exports = router;