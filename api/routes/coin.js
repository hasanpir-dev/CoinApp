const express = require("express");

const {
  getSingleCoin,
  getAllCoinsByCategory,
  addCoin,
  editCoin,
  deleteCoin,
  likeCoin,
  undoLikeCoin,
} = require("../controllers/coin");

const {
  getAccessToRoute,
  getCoinOwnerAccess,
} = require("../middlewares/authorization/auth");

const {
  checkCategoryAndCoinExist,
  checkCategoryExist,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router({ mergeParams: true });

router.get("/", checkCategoryExist, getAllCoinsByCategory);
router.get(
  "/:coin_id/like",
  [checkCategoryAndCoinExist, getAccessToRoute],
  likeCoin
);
router.get(
  "/:coin_id/undo_like",
  [checkCategoryAndCoinExist, getAccessToRoute],
  undoLikeCoin
);
router.get("/:coin_id", checkCategoryAndCoinExist, getSingleCoin);
router.post("/", [getAccessToRoute, checkCategoryExist], addCoin);
router.put(
  "/:coin_id/edit",
  [checkCategoryAndCoinExist, getAccessToRoute, getCoinOwnerAccess],
  editCoin
);
router.delete(
  "/:coin_id/delete",
  [checkCategoryAndCoinExist, getAccessToRoute, getCoinOwnerAccess],
  deleteCoin
);

module.exports = router;
