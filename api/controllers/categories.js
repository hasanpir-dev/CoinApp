const Category = require("../models/Category");

const errorWrapper = require("../helpers/error/errorWrapper");
const Coin = require("../models/Coin");

const getAllCategories = errorWrapper(async (req, res) => {
  const { title } = req.query;

  const query = title ? { title: { $regex: title, $options: "i" } } : {};

  const categories = await Category.find(query);

  return res.status(200).json({
    success: true,
    data: categories,
  });
});

const getSingleCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(200).json({
    success: true,
    data: category,
  });
});

const addCategory = errorWrapper(async (req, res, next) => {
  const information = req.body;

  const category = await Category.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    data: category,
  });
});
const editCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedFields = req.body;

  let category = await Category.findById(id);

  Object.keys(updatedFields).forEach((key) => {
    Category[key] = updatedFields[key];
  });

  await category.save();

  const updatedCategory = await Category.findById(id);
  res.status(200).json({
    success: true,
    data: updatedCategory,
  });
});

const deleteCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Category.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

module.exports = {
  getAllCategories,
  addCategory,
  getSingleCategory,
  editCategory,
  deleteCategory,
};
