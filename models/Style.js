const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const { retrieveRepositoryData } = require("../api/parser");

const schema = new Schema({
  url: {
    type: String,
    required: true
  },
  usercss: {
    type: String,
    unique: true
  },
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
  customDescription: String,
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
  const repositories = await Style.find({}).distinct("url").lean();
  const repositoriesData = await Promise.all(repositories.map(repo => retrieveRepositoryData(repo.url)));
  const Bulk = Style.collection.initializeUnorderedBulkOp();

  repositoriesData.forEach(styleData => {
    delete styleData.name;
    Bulk.find({ url: styleData.url }).update({ $set: styleData });
  });
  return Bulk.execute();
};

exports.Style = mongoose.model("Style", schema);
