module.exports = {
  mongoUrl: "mongodb://localhost/stylebase",
  session: {
    secret: "SECRET",
    name: "stylebase.sid",
    proxy: true,
    resave: true,
    saveUninitialized: false
  },
  github: {
    OAuth: { // https://github.com/settings/developers
      clientId: "",
      clientSecret: ""
    },
    token: "" // https://github.com/settings/tokens with public_repo scope
  }
};
