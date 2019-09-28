const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true }
});

const issueSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  authorName: { type: String, required: true },
  images: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    url: { type: String, required: true },
    key: { type: String, required: true }
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  postedAt: { type: Date, default: Date.now() },
  street: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    index: { type: String, default: "2d" },
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  resolved: {
    type: Boolean,
    default: false
  },
  description: { type: String, default: "" },
  voters: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    default: []
  },
  comments: {
    type: [commentsSchema],
    default: []
  }
});

module.exports = mongoose.model("Issues", issueSchema);
