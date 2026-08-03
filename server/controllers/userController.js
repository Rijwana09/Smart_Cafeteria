const User = require("../models/User");
const Food = require("../models/Food");
const bcrypt = require("bcryptjs");

// Update logged-in user's profile (name / email / password)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;

    if (email && email !== user.email) {
      const emailTaken = await User.findOne({ email });

      if (emailTaken) {
        return res.status(400).json({
          message: "That email is already in use.",
        });
      }

      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updated = await user.save();

    res.status(200).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the logged-in user's favorite foods (populated)
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "favorites"
    );

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle a food in/out of the logged-in user's favorites
const toggleFavorite = async (req, res) => {
  try {
    const { foodId } = req.params;

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const user = await User.findById(req.user._id);

    const index = user.favorites.findIndex(
      (id) => id.toString() === foodId
    );

    let isFavorite;

    if (index === -1) {
      user.favorites.push(foodId);
      isFavorite = true;
    } else {
      user.favorites.splice(index, 1);
      isFavorite = false;
    }

    await user.save();

    res.status(200).json({ isFavorite, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateProfile,
  getFavorites,
  toggleFavorite,
};
