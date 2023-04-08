const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");
const User = require("../models/User");

const getCoinsByUser = errorWrapper(async (req, res, next) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id).populate("coins");

  if (!user) {
    return next(new CustomError("User not found", 400));
  }
  const coins = user.coins;

  res.status(200).json({
    success: true,
    data: coins,
  });
});

module.exports = { getCoinsByUser };
