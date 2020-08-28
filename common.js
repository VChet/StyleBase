const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const Agenda = require("agenda");

const config = require("./config");
const { initCollection } = require("./models/init");
const { Style } = require("./models/Style");
const { retrieveRepositoryData } = require("./api/styles");

mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
initCollection();

const agenda = new Agenda({
  db: {
    address: config.mongoUrl,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
});

agenda.define("Update all styles", () => {
  Style.find({}).lean().exec(async (error, styles) => {
    if (error)console.log({ error });
    const Bulk = Style.collection.initializeUnorderedBulkOp();
    const stylesArr = await Promise.all(styles.map(style => retrieveRepositoryData(style.url)));
    stylesArr.map(style => Bulk.find({ url: style.url }).update({ $set: style }));
    Bulk.execute((bulkError, result) => {
      if (error)console.log({ bulkError });
      console.log("Data updated", result);
    });
  });
});

agenda.start().then(() => agenda.every("0 0 * * *", "Update all styles"));

function addExpressMiddleware(app) {
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
}

function CORSMiddleware(app) {
  app.use((req, res, next) => {
    const origin = req.get("Origin");
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header(
      "Access-Control-Allow-Methods",
      "DELETE,GET,HEAD,POST,PUT,OPTIONS,TRACE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    req.method === "OPTIONS" ?
      res.end() :
      next();
  });
}

module.exports = {
  addExpressMiddleware,
  CORSMiddleware
};
