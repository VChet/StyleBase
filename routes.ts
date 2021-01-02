import { Router } from "express";
import path from "path";
import passport from "passport";

import getRss from "./api/rss";

const router = Router();
const clientIndex = path.join(__dirname, "public/index.html");
const maintenance = path.join(__dirname, "maintenance.html");

// Authentication
router.get("/login/github", passport.authenticate("github"));
router.get("/login/codeberg", passport.authenticate("gitea"));
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/github/callback", passport.authenticate("github"), (_req, res) => res.redirect("/"));
router.get("/codeberg/callback", passport.authenticate("gitea"), (_req, res) => res.redirect("/"));

// RSS
router.get("/rss", getRss);

// Client serving
router.get("*", (_req, res) => res.sendFile(clientIndex, (error: NodeJS.ErrnoException) => {
  if (error && error.code === "ENOENT") return res.status(503).sendFile(maintenance);
}));

export default router;
