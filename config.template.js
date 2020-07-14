module.exports = {
  appPort: "7540",
  mongoUrl: "mongodb://localhost/stylebase",
  appSalt: "SALT",
  session: {
    secret: "SECRET",
    name: "stylebase.sid",
    proxy: true,
    resave: true,
    saveUninitialized: false
  }
};
