const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
  repository: {
    type: String,
    required: true,
    unique: true
  },
  usercss: String,
  preview: String,
  name: String,
  description: String,
  owner: String,
  lastUpdate: String,
  stargazers: Number,
  watchers: Number,
  forks: Number,
  issues: Number,
  license: String,
  isPrivate: Boolean,
  isArchived: Boolean,
  isFork: Boolean
});

exports.Style = mongoose.model("Style", schema);
