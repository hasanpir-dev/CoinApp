const Coin = require("../models/Coin");
const Category = require("../models/Category");
const User = require("../models/User");

const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");

const getSingleCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;

  const coin = await Coin.findById(coin_id)
    .populate({ path: "user", select: "name profile_image" })
    .populate({ path: "category", select: "title" });

  res.status(200).json({
    success: true,
    data: coin,
  });
});

const getAllCoins = errorWrapper(async (req, res, next) => {
  const fromYear = req.query.year ? req.query.year.split(",")[0] : "";
  const toYear = req.query.year ? req.query.year.split(",")[1] : "";
  const fromPrice = req.query.price ? req.query.price.split(",")[0] : "";
  const toPrice = req.query.price ? req.query.price.split(",")[1] : "";

  const query = {
    $and: [
      req.query.title
        ? { title: { $regex: req.query.title, $options: "i" } }
        : {},
      fromYear || toYear
        ? {
            year: {
              ...(fromYear ? { $gte: fromYear } : {}),
              ...(toYear ? { $lte: toYear } : {}),
            },
          }
        : {},
      fromPrice || toPrice
        ? {
            price: {
              ...(fromPrice ? { $gte: fromPrice } : {}),
              ...(toPrice ? { $lte: toPrice } : {}),
            },
          }
        : {},
      req.query.country
        ? { country: { $regex: req.query.country, $options: "i" } }
        : {},
      req.query.metal
        ? { metal: { $regex: req.query.metal, $options: "i" } }
        : {},
      req.query.quality
        ? { quality: { $regex: req.query.quality, $options: "i" } }
        : {},
    ],
  };

  const coins = await Coin.find(query);

  res.status(200).json({
    success: true,
    coinsCount: coins.length,
    data: coins,
  });
});

const getAllCoinsByCategory = errorWrapper(async (req, res, next) => {
  const { category_id } = req.params;
  const fromYear = req.query.year ? req.query.year.split(",")[0] : "";
  const toYear = req.query.year ? req.query.year.split(",")[1] : "";
  const fromPrice = req.query.price ? req.query.price.split(",")[0] : "";
  const toPrice = req.query.price ? req.query.price.split(",")[1] : "";

  const query = {
    $and: [
      req.query.title
        ? { title: { $regex: req.query.title, $options: "i" } }
        : {},
      fromYear || toYear
        ? {
            year: {
              ...(fromYear ? { $gte: fromYear } : {}),
              ...(toYear ? { $lte: toYear } : {}),
            },
          }
        : {},
      fromPrice || toPrice
        ? {
            price: {
              ...(fromPrice ? { $gte: fromPrice } : {}),
              ...(toPrice ? { $lte: toPrice } : {}),
            },
          }
        : {},
      req.query.country
        ? { country: { $regex: req.query.country, $options: "i" } }
        : {},
      req.query.metal
        ? { metal: { $regex: req.query.metal, $options: "i" } }
        : {},
      req.query.quality
        ? { quality: { $regex: req.query.quality, $options: "i" } }
        : {},
    ],
  };

  const category = await Category.findById(category_id).populate({
    path: "coins",
    match: query,
  });

  const coins = category.coins;

  res.status(200).json({
    success: true,
    coinsCount: coins.length,
    data: coins,
  });
});

const addCoin = errorWrapper(async (req, res, next) => {
  const { category_id } = req.params;
  const user_id = req.user.id;

  const information = req.body;

  const coin = await Coin.create({
    ...information,
    category: category_id,
    user: user_id,
  });

  res.status(200).json({
    success: true,
    data: coin,
  });
});

const editCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;
  const updatedFields = req.body;

  let coin = await Coin.findById(coin_id);

  if (!coin.category.equals(updatedFields.category)) {
    const oldCategory = await Category.findById(coin.category);
    const newCategory = await Category.findById(updatedFields.category);

    if (oldCategory.coins.includes(coin_id)) {
      oldCategory.coins.pull(coin_id);
      oldCategory.coinsCount -= 1;
      await oldCategory.save();
    }

    newCategory.coins.push(coin_id);
    newCategory.coinsCount += 1;
    await newCategory.save();
  }

  coin = await Coin.findByIdAndUpdate(
    coin_id,
    {
      ...updatedFields,
    },
    { new: true }
  );

  coin = await coin.save();

  res.status(200).json({
    success: true,
    data: coin,
  });
});

const deleteCoin = errorWrapper(async (req, res, next) => {
  const coin_id = req.params.coin_id;

  const coin = await Coin.findById(coin_id);

  //await coin.remove();

  const category = await Category.findById(coin.category);
  const user = await User.findById(coin.user);

  user.coins.splice(user.coins.indexOf(coin._id), 1);
  user.coinsCount -= 1;
  await user.save();

  category.coins.splice(category.coins.indexOf(coin._id), 1);
  category.coinsCount -= 1;
  await category.save();

  await coin.deleteOne();

  res.status(200).json({
    success: true,
    message: `Coin with ID ${coin_id} deleted successfully`,
  });
});

const likeCoin = errorWrapper(async (req, res, next) => {
  const coin_id = req.params.coin_id;

  const coin = await Coin.findById(coin_id);

  if (coin.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this ", 400));
  }
  coin.likes.push(req.user.id);
  coin.likeCount += 1;

  await coin.save();

  return res.status(200).json({
    success: true,
    data: coin,
  });
});
const undoLikeCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;

  const coin = await Coin.findById(coin_id);

  if (!coin.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this", 400)
    );
  }
  const index = coin.likes.indexOf(req.user.id);

  coin.likes.splice(index, 1);
  coin.likeCount -= 1;

  await coin.save();

  res.status(200).json({
    success: false,
    data: coin,
  });
});

module.exports = {
  getSingleCoin,
  getAllCoins,
  getAllCoinsByCategory,
  addCoin,
  editCoin,
  deleteCoin,
  likeCoin,
  undoLikeCoin,
};
