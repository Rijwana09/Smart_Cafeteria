const Order = require("../models/Order");
const User = require("../models/User");
const Food = require("../models/Food");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getOrderDetails = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )
        .populate("user", "name email")
        .populate("orderItems.food");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Placed",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled",
    ];

    if (
      !validStatuses.includes(status)
    ) {
      return res.status(400).json({
        message:
          "Invalid order status.",
      });
    }

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found.",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      message:
        "Order status updated.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats =
  async (req, res) => {
    try {
      const totalOrders =
        await Order.countDocuments();

      const totalUsers =
        await User.countDocuments();

      const totalFoods =
        await Food.countDocuments();

      const revenue =
        await Order.aggregate([
          {
            $match: {
              orderStatus:
                "Delivered",
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$totalAmount",
              },
            },
          },
        ]);

      res.json({
        totalOrders,
        totalUsers,
        totalFoods,
        totalRevenue:
          revenue[0]?.total || 0,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  module.exports = {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  getDashboardStats,
};