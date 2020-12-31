import mongoose from "mongoose";

import Agenda from "agenda";

import session from "express-session";
const MongoStore = require("connect-mongo")(session);
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
//@ts-ignore
import { Strategy as GiteaStrategy } from "passport-gitea";

import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";

import config from "./config";
import { IUser, User } from "./models/User";
import { Style } from "./models/Style";
import { initCollection } from "./models/init";
import { Application } from "express";

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
passport.use(
  new GiteaStrategy({
    clientID: config.codeberg.OAuth.clientId,
    clientSecret: config.codeberg.OAuth.clientSecret,
    callbackURL: "/codeberg/callback",
    authorizationURL: "https://codeberg.org/login/oauth/authorize",
    tokenURL: "https://codeberg.org/login/oauth/access_token",
    userProfileURL: "https://codeberg.org/api/v1/user"
  }, User.findOrCreate.bind(User))
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error: any, user: IUser) => {
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
export function addExpressMiddleware(app: Application) {
  app.use(morgan("dev"));
  app.use(helmet({
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https:"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src": [
          "'self'", "data:",
          "https://www.googletagmanager.com", "https://www.google-analytics.com",
          "https://cloudflareinsights.com", "https://static.cloudflareinsights.com"
        ],
        "connect-src": [
          "'self'",
          "https://www.google-analytics.com",
          "https://cloudflareinsights.com", "https://static.cloudflareinsights.com"
        ]
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
