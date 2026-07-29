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

module.exports = {
  getFoods,
  getFoodById,
};