const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a category"],
    minlength: [5, "Please provide title at least 5 characters"],
    maxlength: [20, "Please provide title less than 20 characters"],
    unique: [true, "Category already exists"],
  },
  description: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [10, "Please provide content at least 10 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  coinsCount: {
    type: Number,
    default: 0,
  },
  coins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Coin",
    },
  ],
});

// Pre Save Method
CategorySchema.pre("save", function (next) {
  if (!this.isModified("title")) next();

  this.slug = this.makeSlug();
  next();
});

CategorySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Category", CategorySchema);
