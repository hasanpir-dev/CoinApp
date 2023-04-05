const express = require("express");

const auth = require("./auth");
const category = require("./category");
const user = require("./user");
const {
  getAllCoins,
  getSingleCoin,
  deleteCoin,
} = require("../controllers/coin");
const {
  checkCategoryAndCoinExist,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  getAccessToRoute,
  getCoinOwnerAccess,
} = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/coins", getAllCoins);
router.get("/coins/:coin_id", getSingleCoin);
router.delete(
  "/coins/:coin_id/delete",
  [getAccessToRoute, getCoinOwnerAccess],
  deleteCoin
);
router.use("/auth", auth);
// router.use("/admin", admin);
router.use("/users", user);
router.use("/category", category);

module.exports = router;
