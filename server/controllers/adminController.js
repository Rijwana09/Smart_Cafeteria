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


// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Popular Foods (Admin) - top ordered items
const getPopularFoods = async (req, res) => {
  try {
    const popular = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.name",
          orders: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { orders: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(
      popular.map((item) => ({
        name: item._id,
        orders: item.orders,
      }))
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Revenue for the last 7 days (Admin) — for the dashboard revenue chart
const getRevenueChart = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const results = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in any missing days with zero so the chart always has 7 points.
    const byDate = Object.fromEntries(
      results.map((r) => [r._id, r])
    );

    const chart = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);

      const key = d.toISOString().slice(0, 10);

      chart.push({
        date: key,
        revenue: byDate[key]?.revenue || 0,
        orders: byDate[key]?.orders || 0,
      });
    }

    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a user's role (Admin)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["customer", "staff", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role.",
      });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        message: "You can't change your own role.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a user (Admin)
const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        message: "You can't delete your own account.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User removed.",
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
  getAllUsers,
  getPopularFoods,
  getRevenueChart,
  updateUserRole,
  deleteUser,
};