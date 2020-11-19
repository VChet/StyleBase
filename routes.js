const express = require("express");
const path = require("path");
const passport = require("passport");

const router = express.Router();
const clientIndex = path.join(__dirname, "public/index.html");
const maintenance = path.join(__dirname, "maintenance.html");

// Authentication
router.get("/login", passport.authenticate("github", { scope: ["read:user"] }));
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/github/callback", passport.authenticate("github"), (req, res) => res.redirect("/"));

// Client serving
router.get("*", (req, res) => res.sendFile(clientIndex, (error) => {
  if (error && error.code === "ENOENT") return res.status(503).sendFile(maintenance);
}));

module.exports = router;
