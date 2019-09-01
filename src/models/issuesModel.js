const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true }
});

const issueSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  authorName: { type: String, required: true },
  postedAt: { type: Date, default: Date.now() },
  images: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  address: { type: String, default: "" },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  description: { type: String, default: "" },
  support: { type: Number, default: 1 },
  comments: {
    type: [commentsSchema],
    default: []
  }
});

module.exports = mongoose.model("Issues", issueSchema);