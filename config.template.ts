/* eslint-disable max-len */
import type { Config } from "./types/server";

export default {
  appPort: "7540",
  mongoUrl: "mongodb://localhost/stylebase",
  session: {
    secret: "SECRET",
    name: "stylebase.sid",
    proxy: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 3600000 * 24 * 14
    },
    rolling: true
  },
  github: {
    OAuth: {
      clientId: "",
      clientSecret: ""
    },
    token: ""
  },
  codeberg: {
    OAuth: {
      clientId: "",
      clientSecret: ""
    },
    token: ""
  }
} as Config;
