const mongoose = require("mongoose");

const Agenda = require("agenda");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");

const config = require("./config");
const { User } = require("./models/User");
const { Style } = require("./models/Style");
const { initCollection } = require("./models/init");

// Database
mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

config.session.store = new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 14 * 24 * 60 * 60
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
initCollection();

// Authentication
passport.use(
  new GitHubStrategy({
    clientID: config.github.OAuth.clientId,
    clientSecret: config.github.OAuth.clientSecret,
    callbackURL: "/github/callback"
  }, User.findOrCreate.bind(User))
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    if (error) return done(error);
    return done(null, user);
  });
});

// Agenda
const agenda = new Agenda({
  db: {
    address: config.mongoUrl,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
});

if (process.env.NODE_ENV === "production") {
  agenda.define("Update all styles", async () => {
    console.log(await Style.updateAllStyles());
  });
  agenda.start().then(() => agenda.every("0 * * * *", "Update all styles"));
}

// Middleware
function addExpressMiddleware(app) {
  app.use(morgan("dev"));
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": [
          "'self'",
          "data:",
          "https:"
        ],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src": [
          "'self'",
          "https://www.googletagmanager.com", "https://www.google-analytics.com"
        ],
        "connect-src": ["'self'", "https://www.google-analytics.com"]
      }
    }
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session(config.session));
  app.use(passport.initialize());
  app.use(passport.session());
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