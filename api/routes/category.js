const express = require("express");

const {
  checkCategoryExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
  getAllCategories,
  addCategory,
  getSingleCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categories");

const {
  getAccessToRoute,
  getCategoryOwnerAccess,
} = require("../middlewares/authorization/auth");

const coin = require("./coin");

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:id", getSingleCategory);

router.post("/add", getAccessToRoute, addCategory);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkCategoryExist, getCategoryOwnerAccess],
  editCategory
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkCategoryExist, getCategoryOwnerAccess],
  deleteCategory
);
router.use("/:category_id/coins", checkCategoryExist, coin);

module.exports = router;
