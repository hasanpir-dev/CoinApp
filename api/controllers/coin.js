const Coin = require("../models/Coin");
const Category = require("../models/Category");

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
  const query = {
    $and: [
      req.query.title ? { title: { $regex: req.query.title, $options: "i" } } : {},
      req.query.year ? { year: { $gte: req.query.year.split(",")[0], $lte: req.query.year.split(",")[1] } } : {},
      req.query.price ? { price: { $gte: req.query.price.split(",")[0], $lte: req.query.price.split(",")[1] } } : {},
      req.query.country ? { country: { $regex: req.query.country, $options: "i" } } : {},
      req.query.metal ? { metal: { $regex: req.query.metal, $options: "i" } } : {},
      req.query.quality ? { quality: { $regex: req.query.quality, $options: "i" } } : {},
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

  const query = {};
  const {
    title,
    year,
    price,
    country,
    metal,
    quality
  } = req.query;

  if (title) query.title = { $regex: title, $options: "i" };
  if (year) {
    const [minYear, maxYear] = year.split(',');
    query.year = { $gte: minYear, $lte: maxYear };
  }
  if (price) {
    const [minPrice, maxPrice] = price.split(',');
    query.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (country) query.country = { $regex: country, $options: "i" };
  if (metal) query.metal = { $regex: metal, $options: "i" };
  if (quality) query.quality = { $regex: quality, $options: "i" };

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
  const { title, description, image } = req.body;

  let coin = await Coin.findById(coin_id);

  coin.title = title;
  coin.description = description;
  coin.image = image;

  coin = await coin.save();

  res.status(200).json({
    success: true,
    data: coin,
  });
});
const deleteCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;

  const coin = await Coin.findById(coin_id);

  await coin.remove();

  res.status(200).json({
    success: true,
    message: "Coin Deleted Successfully",
  });
});
const likeCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;

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
