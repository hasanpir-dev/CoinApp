const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");
const User = require("./User");
const slugify = require("slugify");

const CoinSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: [5, "Please provide title at least 5 characters"],
    maxlength: [30, "Please provide title less than 25 characters"],
  },
  faceValue: {
    type: String,
    required: [true, "Please provide a value"],
  },
  year: {
    type: Number,
    required: [true, "Please provide a year"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country"],
  },
  metal: {
    type: String,
    required: [true, "Please provide a metal"],
  },
  shortDesc: {
    type: String,
    required: [true, "Please provide a short description"],
    minlength: [8, "Please provide a description at least 10 characters"],
    maxlength: [
      250,
      "Please provide a long description at least 50 characters",
    ],
  },
  longDesc: {
    type: String,
    required: [true, "Please provide a description"],
    minlength: [16, "Please provide a long description at least 16 characters"],
    maxlength: [
      650,
      "Please provide a long description at least 700 characters",
    ],
  },
  quality: {
    type: String,
    required: [true, "Please provide a quality"],
  },

  weight: {
    type: String,
    required: [true, "Please provide a weight"],
  },

  imgObverse: {
    type: String,
    required: [true, "Please provide a observe image"],
  },
  imgReverse: {
    type: String,
    required: [true, "Please provide a reverse image"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});
CoinSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();

  try {
    const category = await Category.findById(this.category);
    const user = await User.findById(this.user);

    user.coins.push(this.id);
    user.coinsCount += 1;
    await user.save();

    category.coins.push(this.id);
    category.coinsCount += 1;
    await category.save();
    next();
  } catch (err) {
    next(err);
  }
});

CoinSchema.pre("save", function (next) {
  if (!this.isModified("title")) next();

  this.slug = this.makeSlug();
  next();
});

CoinSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

CoinSchema.post("remove", async function () {
  const category = await Category.findById(this.category);
  const user = await User.findById(this.user);

  user.coins.splice(user.coins.indexOf(this._id), 1);
  user.coinsCount = 100;
  await user.save();

  category.coins.splice(category.coins.indexOf(this._id), 1);
  category.coinsCount -= 1;

  await category.save();
});

CoinSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Coin", CoinSchema);
