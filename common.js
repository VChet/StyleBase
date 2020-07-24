const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");

const config = require("./config");

mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

function addExpressMiddleware(app) {
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
}

module.exports = { addExpressMiddleware };
