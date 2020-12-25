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
  owner: {
    type: {
      id: Number,
      login: String
    }
  },
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
  "owner.login": "text",
  topics: "text"
});
schema.plugin(mongoosePaginate);

schema.statics.updateAllStyles = async function updateAllStyles() {
  const Style = this;
  const styles = await Style.find({}).lean();
  const stylesData = await Promise.allSettled(
    styles.map(({ url, usercss }) => retrieveRepositoryData(url, { download_url: usercss }))
  );

  const Bulk = Style.collection.initializeUnorderedBulkOp();
  stylesData
    .filter(data => data.status === "fulfilled")
    .forEach(promise => {
      const styleData = promise.value;
      Bulk.find({ usercss: styleData.usercss }).update({ $set: styleData });
    });
  return Bulk.execute();
};

exports.Style = mongoose.model("Style", schema);
