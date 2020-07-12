const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  repoLink: {
    type: String,
    required: true,
    unique: true
  }
});

exports.Style = mongoose.model("Style", schema);
