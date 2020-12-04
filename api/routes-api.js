const express = require("express");
const apicache = require("apicache");
const rateLimit = require("express-rate-limit");

const { Style } = require("../models/Style");

const router = express.Router();

// Cache
const cache = apicache.middleware;
const onlyStatus200 = (req, res) => process.env.NODE_ENV === "production" && res.statusCode === 200;
const cacheSuccessful = cache("10 minutes", onlyStatus200);
const clearCache = (req, res, next) => {
  apicache.clear();
  next();
};
// Rate limiter (allow 30 request per 60 minutes)
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { error: "Too many update requests made from this IP, please try again after 1 hour" },
  skip: () => process.env.NODE_ENV !== "production"
});

const isAuthorized = async (req, res, next) => {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ error: "Request must contain _id field" });
  const existingStyle = await Style.findById(_id).lean();
  if (!existingStyle) return res.status(404).json({ error: "Style does not exist" });
  req.styleData = existingStyle;

  if (process.env.NODE_ENV !== "production") return next();

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication is required to perform this action" });
  }
  const isAdmin = req.user.role === "Admin";
  const isOwner = req.user.username === existingStyle.owner;
  const userOrgs = req.user.orgs.map((org) => org.name);
  const isMember = userOrgs.includes(existingStyle.owner);
  if (!isAdmin && !isOwner && !isMember) {
    return res.status(403).json({ error: "You are not authorized to perform this action" });
  }
  next();
};

const {
  getStyles,
  getRepositoryFiles,
  getStyleData,
  addStyle,
  updateAllStyles,
  updateStyle,
  editStyle,
  deleteStyle
} = require("./styles");

const {
  getCurrentUser
} = require("./users");

router.get("/styles/:owner?", cacheSuccessful, getStyles);
router.get("/style/files", getRepositoryFiles);
router.get("/style", cacheSuccessful, getStyleData);
router.post("/style/add", rateLimiter, addStyle);
router.put("/style/update/all", rateLimiter, updateAllStyles);
router.put("/style/update", rateLimiter, updateStyle);
router.put("/style/edit", isAuthorized, clearCache, editStyle);
router.delete("/style/delete", isAuthorized, clearCache, deleteStyle);

router.get("/me", getCurrentUser);

module.exports = router;
