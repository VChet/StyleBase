module.exports = {
  appPort: "7540",
  mongoUrl: "mongodb://localhost/stylebase",
  session: {
    secret: "SECRET",
    name: "stylebase.sid",
    proxy: true,
    resave: true,
    saveUninitialized: false
  },
  GHOAuth: {
    clientId: "",
    clientSecret: ""
  },
  GHToken: "Personal access token",
  CaptchaSecretKey: ""
};
