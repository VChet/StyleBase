const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const { retrieveRepositoryData } = require("../api/parser");

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

schema.statics.updateAllStyles = async function updateAllStyles() {
  const Style = this;
  const styles = await Style.find({}).lean();
  const Bulk = Style.collection.initializeUnorderedBulkOp();
  const stylesArr = await Promise.all(styles.map(style => retrieveRepositoryData(style.url)));
  stylesArr.map(style => Bulk.find({ url: style.url }).update({ $set: style }));
  return Bulk.execute();
};

exports.Style = mongoose.model("Style", schema);
