const Order = require("../models/Order");
const Food = require("../models/Food");


//Create Order
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      paymentMethod,
      notes,
      orderItems,
      totalAmount,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty.",
      });
    }

    // Validate stock
    for (const item of orderItems) {
      const food = await Food.findById(item._id);

      if (!food) {
        return res.status(404).json({
          message: `${item.name} not found.`,
        });
      }

      if (food.stock < item.quantity) {
        return res.status(400).json({
          message: `${food.name} is out of stock.`,
        });
      }
    }

    // Reduce stock
    for (const item of orderItems) {
      await Food.findByIdAndUpdate(item._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    const order = await Order.create({
      user: req.user._id,

      customerName,

      phone,

      paymentMethod,

      notes,

      totalAmount,

      orderItems: orderItems.map((item) => ({
        food: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Get Single Order
const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          "user",
          "name email"
        )
        .populate(
          "orderItems.food"
        );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found.",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};