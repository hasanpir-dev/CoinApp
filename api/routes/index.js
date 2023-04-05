const express = require("express");

const auth = require("./auth");
const category = require("./category");
const user = require("./user");
const { getAllCoins, getSingleCoin } = require("../controllers/coin");

const router = express.Router();

router.get("/coins", getAllCoins);
router.get("/coins/:coin_id", getSingleCoin);
router.use("/auth", auth);
// router.use("/admin", admin);
router.use("/users", user);
router.use("/category", category);

module.exports = router;
