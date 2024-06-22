const db = require("../models/index");

//generate token
const generateToken = async (req, res) => {
  const { meter_number, amount } = req.body;

  if (amount % 100 !== 0 || amount < 100 || amount > 182500) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const token_value_days = amount / 100; // Calculate token_value_days based on amount
  const token = Math.random().toString(36).slice(2, 10).toUpperCase();
  const purchased_date = new Date();

  try {
    const newToken = await db.PurchasedToken.create({
      meter_number,
      token,
      token_status: "NEW",
      token_value_days, // Provide token_value_days in the create method
      purchased_date,
      amount,
    });
    res.status(200).json({
      message: "Token generated successfully",
      token: newToken,
    });
  } catch (error) {
    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      return res.status(400).json({ message: "Validation error", errors });
    }
    // Handle other unexpected errors
    res.status(500).json({ message: "Error generating token", error });
  }
};

// validate token
const validateToken = async (req, res) => {
  const { token } = req.body;

  try {
    const foundToken = await db.PurchasedToken.findOne({ where: { token } });
    if (foundToken) {
      res
        .status(200)
        .json({
          message: "Token available",
          token_value_days: foundToken.token_value_days,
        });
    } else {
      res.status(404).json({ message: "Token not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
};

// get token history
const getTokenHistory = async (req, res) => {
  const { meter_number } = req.body;
  try {
    const tokens = await db.PurchasedToken.findAll({ where: { meter_number } });
    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ message: "Error fetching token history", error });
    console.log(error);
  }
};

module.exports = {
  generateToken,
  validateToken,
  getTokenHistory,
};
