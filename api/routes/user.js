const express = require("express");
const router = express.Router();

const { getCoinsByUser } = require("../controllers/user");

router.get("/:user_id/coins", getCoinsByUser);

module.exports = router;
