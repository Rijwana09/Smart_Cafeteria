const Food = require("../models/Food");

// Get all foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      isAvailable: true,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(
      req.params.id
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create food (Admin)
const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      category,
      price,
      stock,
      isAvailable,
    } = req.body;

    if (!name || !description || !image || !category || price === undefined) {
      return res.status(400).json({
        message: "Please provide all required food fields.",
      });
    }

    const food = await Food.create({
      name,
      description,
      image,
      category,
      price,
      stock: stock ?? 0,
      isAvailable: isAvailable ?? true,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update food (Admin)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    const fields = [
      "name",
      "description",
      "image",
      "category",
      "price",
      "stock",
      "isAvailable",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        food[field] = req.body[field];
      }
    });

    const updatedFood = await food.save();

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete food (Admin)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    await food.deleteOne();

    res.status(200).json({
      message: "Food removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all foods (Admin - includes unavailable/out-of-stock items)
const getAllFoodsAdmin = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getAllFoodsAdmin,
};