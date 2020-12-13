const express = require("express");
const path = require("path");
const passport = require("passport");

const { getRss } = require("./api/rss");

const router = express.Router();
const clientIndex = path.join(__dirname, "public/index.html");
const maintenance = path.join(__dirname, "maintenance.html");

// Authentication
router.get("/login/github", passport.authenticate("github"));
router.get("/login/codeberg", passport.authenticate("gitea"));
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/github/callback", passport.authenticate("github"), (req, res) => res.redirect("/"));
router.get("/codeberg/callback", passport.authenticate("gitea"), (req, res) => res.redirect("/"));

// RSS
router.get("/rss", getRss);

// Client serving
router.get("*", (req, res) => res.sendFile(clientIndex, (error) => {
  if (error && error.code === "ENOENT") return res.status(503).sendFile(maintenance);
}));

module.exports = router;
