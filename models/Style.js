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
  created: Date,
  lastUpdate: Date,
  topics: Array,
  stargazers: Number,
  watchers: Number,
  forks: Number,
  issues: Number,
  license: String,
  isPrivate: Boolean,
  isArchived: Boolean,
  isFork: Boolean,
  customName: String,
  customPreview: String
});

schema.index({
  name: "text",
  customName: "text",
  owner: "text",
  topics: "text"
});
schema.plugin(mongoosePaginate);

exports.Style = mongoose.model("Style", schema);
