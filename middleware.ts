import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import Agenda from "agenda";

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

import morgan from "morgan";
import helmet from "helmet";
import { json, urlencoded } from "express";
import compression from "compression";

import type { Application } from "express";
import type { IUser } from "./models/User";

import config from "./config";
import { User } from "./models/User";
import { Style } from "./models/Style";
import initCollection from "./models/init";

// Database
mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
initCollection();

// Authentication
passport.use(
  new GitHubStrategy({
    clientID: config.github.OAuth.clientId,
    clientSecret: config.github.OAuth.clientSecret,
    callbackURL: "/github/callback",
    proxy: process.env.NODE_ENV === "production"
  }, User.findOrCreate.bind(User, "GitHub"))
);
passport.use(
  "codeberg",
  new GitHubStrategy({
    clientID: config.codeberg.OAuth.clientId,
    clientSecret: config.codeberg.OAuth.clientSecret,
    callbackURL: "/codeberg/callback",
    proxy: process.env.NODE_ENV === "production",
    authorizationURL: "https://codeberg.org/login/oauth/authorize",
    tokenURL: "https://codeberg.org/login/oauth/access_token",
    userProfileURL: "https://codeberg.org/api/v1/user"
  }, User.findOrCreate.bind(User, "Codeberg"))
);

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).lean().exec((error: mongoose.CallbackError, user) => {
    if (error) return done(error);
    if (user) return done(null, user as Express.User);
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
export default function addExpressMiddleware(app: Application) {
  if (process.env.NODE_ENV === "production") app.enable("trust proxy");
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
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoUrl }),
    proxy: process.env.NODE_ENV === "production",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24 * 14
    },
    rolling: true,
    ...config.session
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());
}
