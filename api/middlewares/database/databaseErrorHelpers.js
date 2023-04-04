const path = require("path");
const root = path.dirname(require.main.filename);

const Category = require("../../models/Category");
const User = require("../../models/User");
const Coin = require("../../models/Coin");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const checkCategoryExist = errorWrapper(async (req, res, next) => {
  const category_id = req.params.id || req.params.category_id;

  const category = await Category.findById(category_id);

  if (!category) {
    return next(
      new CustomError(`Category Not Found with Id : ${category_id}`, 404)
    );
  }
  next();
});

const checkUserExist = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError(`User Not Found with Id : ${id}`, 404));
  }
  next();
});

const checkCategoryAndCoinExist = errorWrapper(async (req, res, next) => {
  const { coin_id, category_id } = req.params;

  const coin = await Coin.findOne({
    _id: coin_id,
    category: category_id,
  });

  if (!coin) {
    return next(
      new CustomError(
        `Coin Not Found with Coin Id : ${coin_id} in this Category`,
        404
      )
    );
  }
  next();
});

module.exports = {
  checkCategoryExist,
  checkUserExist,
  checkCategoryAndCoinExist,
};
