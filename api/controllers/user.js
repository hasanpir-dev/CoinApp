const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");
const User = require("../models/User");

const getCoinsByUser = errorWrapper(async (req, res, next) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id).populate("coins");

  if (!user) {
    return next(new CustomError("User not found", 400));
  }

  const { title, country, metal, quality, year, price } = req.query;
  const query = {};

  if (title) {
    query.title = { $regex: new RegExp(title, "i") };
  }
  if (country) {
    query.country = { $regex: new RegExp(country, "i") };
  }
  if (metal) {
    query.metal = { $regex: new RegExp(metal, "i") };
  }
  if (quality) {
    query.quality = { $regex: new RegExp(quality, "i") };
  }
  if (year) {
    const [fromYear, toYear] = year.split(",");
    query.year = {};
    if (fromYear) {
      query.year.$gte = fromYear;
    }
    if (toYear) {
      query.year.$lte = toYear;
    }
  }
  if (price) {
    const [fromPrice, toPrice] = price.split(",");
    query.price = {};
    if (fromPrice) {
      query.price.$gte = fromPrice;
    }
    if (toPrice) {
      query.price.$lte = toPrice;
    }
  }

  const coins = user.coins.filter((coin) => {
    for (let prop in query) {
      if (prop === "year" || prop === "price") {
        if (!coin[prop] || !query[prop].$gte) continue;
        if (coin[prop] < query[prop].$gte) return false;
        if (query[prop].$lte && coin[prop] > query[prop].$lte) return false;
      } else if (
        !coin[prop] ||
        !(query[prop] instanceof RegExp) ||
        !query[prop].test(coin[prop].toString().toLowerCase())
      ) {
        return false;
      }
    }
    return true;
  });

  res.status(200).json({
    success: true,
    data: coins,
  });
});

module.exports = { getCoinsByUser };
