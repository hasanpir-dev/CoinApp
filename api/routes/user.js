const express = require("express");
const router = express.Router();

const { getCoinsByUser } = require("../controllers/user");
const { getUserComments } = require("../controllers/comment");

router.get("/:user_id/coins", getCoinsByUser);
router.get("/:user_id/comments", getUserComments);

module.exports = router;
