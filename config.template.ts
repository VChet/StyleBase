/* eslint-disable max-len */
import type { Config } from "./types/server";

export default {
  appPort: "7540",
  mongoUrl: "mongodb://localhost/stylebase",
  session: {
    secret: "SECRET",
    name: "stylebase.sid"
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
