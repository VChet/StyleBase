const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const schema = new Schema({
  url: {
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
  isFork: Boolean,
  added: {
    type: Date,
    default: Date.now
  }
});

schema.index({ name: "text", owner: "text" });
schema.plugin(mongoosePaginate);

exports.Style = mongoose.model("Style", schema);
