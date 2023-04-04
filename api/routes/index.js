const express = require("express");

const auth = require("./auth");
const category = require("./category");
const user = require("./user");

const router = express.Router();

router.use("/auth", auth);
// router.use("/admin", admin);
router.use("/users", user);
router.use("/category", category);

module.exports = router;
