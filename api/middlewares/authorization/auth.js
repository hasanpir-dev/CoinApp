const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/error/errorWrapper");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Coin = require("../../models/Coin");

const CustomError = require("../../helpers/error/customError");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  // Is Token Included
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this page", 403)
    );
  }

  // Get Token From Header

  const accessToken = getAccessTokenFromHeader(req);

  // Control If Token Valid

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
    };
    next();
  });
});
const getAdminAccess = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "admin") {
    return next(new CustomError("Only admins can access this route", 403));
  }
  return next();
});
const getCategoryOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const categoryId = req.params.id;

  const category = await Category.findById(categoryId);

  if (category.user !== userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});

const getCoinOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const coinId = req.params.coin_id;

  const coin = await Coin.findById(coinId);

  if (coin.user != userId) {
    return next(
      new CustomError(
        `Only owner can handle this operation&${userId}--- ${coin.user}`,
        403
      )
    );
  }
  return next();
});

const getOwnerAccess = (model) =>
  errorWrapper(async (req, res, next) => {
    const { id } = req.params; // comment_id
    const userId = req.user.id;

    const data = await model.findById(id);

    if (!data) {
      return next(
        new CustomError(`The requested ${model.modelName} is not found`, 404)
      );
    }

    if (data.user.toString() !== userId.toString()) {
      return next(
        new CustomError(
          `You are not authorized to access this ${model.modelName}`,
          403
        )
      );
    }

    req.data = data;
    next();
  });

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const accessToken = authorization.split(" ")[1];
  return accessToken;
};
const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getCategoryOwnerAccess,
  getCoinOwnerAccess,
  getOwnerAccess,
};
