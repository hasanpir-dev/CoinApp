const User = require("../models/User");
const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");
const Comment = require("../models/Comment");
const Coin = require("../models/Coin");

const addComment = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;
  const { text } = req.body;

  const [coin, user] = await Promise.all([
    Coin.findById(coin_id),
    User.findById(req.user._id),
  ]);
  if (!coin) {
    return next(new CustomError("Coin not found", 404));
  }

  const comment = await Comment.create({
    text,
    user: req.user._id,
    coin: coin_id,
  });

  user.comments.push(comment._id);
  coin.comments.push(comment._id);
  await Promise.all([user.save(), coin.save()]);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

const getCommentsByCoin = errorWrapper(async (req, res, next) => {
  const { coin_id } = req.params;

  const coin = await Coin.findById(coin_id).populate("comments");

  if (!coin) {
    return next(new CustomError("Coin not found", 404));
  }

  const comments = coin.comments;

  res.status(200).json({
    success: true,
    data: comments,
  });
});

const getUserComments = errorWrapper(async (req, res) => {
  const { user_id } = req.params;

  const comments = await Comment.find({ user: user_id }).populate({
    path: "coin",
    select: "title",
  });

  res.status(200).json({
    success: true,
    data: comments,
  });
});

const deleteComment = errorWrapper(async (req, res, next) => {
  const { comment_id } = req.params;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return next(new CustomError("Comment not found", 404));
  }

  await comment.remove();

  const updateQuery = { $pull: { comments: comment._id } };
  await Promise.allSettled([
    User.findByIdAndUpdate(req.user._id, updateQuery),
    Coin.findByIdAndUpdate(comment.coin, updateQuery),
  ]);
  res.status(200).json({
    success: true,
    message: "Comment has been deleted",
  });
});

const updateComment = errorWrapper(async (req, res, next) => {
  const { comment_id } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return next(new CustomError("Comment not found", 404));
  }

  comment.text = text;
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

module.exports = {
  addComment,
  getCommentsByCoin,
  getUserComments,
  deleteComment,
  updateComment,
};
