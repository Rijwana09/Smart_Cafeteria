const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Food = require("./models/Food");
const foods = require("./data/foods");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Food.deleteMany();

    await Food.insertMany(foods);

    console.log("Foods Added");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();