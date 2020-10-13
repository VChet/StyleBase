const path = require("path");
const express = require("express");
const passport = require("passport");

const config = require("./config");
const {
  addExpressMiddleware,
  CORSMiddleware
} = require("./common");
const api = require("./api/routes");

const app = express();
const PORT = process.env.PORT || config.appPort;

CORSMiddleware(app);
addExpressMiddleware(app);

app.use(express.static("public"));
app.use("/api", api);

app.get("/login", passport.authenticate("github", { scope: ["read:user"] }));
app.get("/github/callback", passport.authenticate("github"), (req, res) => res.redirect("/"));

const clientIndex = path.join(__dirname, "public/index.html");
const maintenance = path.join(__dirname, "maintenance.html");
app.get("*", (req, res) => res.sendFile(clientIndex, (error) => {
  if (error && error.code === "ENOENT") return res.status(503).sendFile(maintenance);
}));

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = app;
