const Category = require("../models/Category");

const errorWrapper = require("../helpers/error/errorWrapper");

const getAllCategories = errorWrapper(async (req, res) => {
  const categories = await Category.find();

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
    message: category,
  });
});
const editCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  let category = await Category.findById(id);

  category.title = title;
  category.description = description;
  category.image = image;

  category = await category.save();

  res.status(200).json({
    success: true,
    data: category,
  });
});

const deleteCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Category.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

module.exports = {
  getAllCategories,
  addCategory,
  getSingleCategory,
  editCategory,
  deleteCategory,
};
