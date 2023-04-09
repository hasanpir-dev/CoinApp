const express = require("express");

const auth = require("./auth");
const category = require("./category");
const user = require("./user");
const {
  getAllCoins,
  getSingleCoin,
  deleteCoin,
  editCoin,
  likeCoin,
  undoLikeCoin,
} = require("../controllers/coin");
const {} = require("../middlewares/database/databaseErrorHelpers");
const {
  getAccessToRoute,
  getCoinOwnerAccess,
} = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/coins", getAllCoins);
router.get("/coins/:coin_id", getSingleCoin);
router.put(
  "/coins/:coin_id/edit",
  [getAccessToRoute, getCoinOwnerAccess],
  editCoin
);
router.delete(
  "/coins/:coin_id/delete",
  [getAccessToRoute, getCoinOwnerAccess],
  deleteCoin
);

router.get("/coins/:coin_id/like", getAccessToRoute, likeCoin);
router.get("/coins/:coin_id/undo_like", getAccessToRoute, undoLikeCoin);

router.use("/auth", auth);
// router.use("/admin", admin);
router.use("/users", user);
router.use("/category", category);

module.exports = router;
