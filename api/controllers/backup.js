const errorWrapper = require("../helpers/error/errorWrapper");
const Category = require("../models/Category");
const getAllCoinsByCategory = errorWrapper(async (req, res, next) => {
  const { category_id } = req.params;

  const category = await Category.findById(category_id).populate("coins");

  const coins = category.coins;

  res.status(200).json({
    success: true,
    coinsCount: coins.length,
    data: coins,
  });
});
