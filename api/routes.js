const express = require("express");
const apicache = require("apicache");
const rateLimit = require("express-rate-limit");

const router = express.Router();
const cache = apicache.middleware;

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccessful = cache("10 minutes", onlyStatus200);

// Allow 1 request per 10 minutes
const GHRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message:
    "Too many update requests made from this IP, please try again after 10 minutes"
});

const {
  getStyles,
  getStyleData,
  searchStyle,
  addStyle,
  updateAllStyles,
  updateStyle,
  deleteStyle,
  getStylesByOwner
} = require("./styles");

router.get("/styles/:page?", cacheSuccessful, getStyles);
router.get("/style/:id", cacheSuccessful, getStyleData);
router.get("/search/:page?", searchStyle);
router.get("/owner/:owner/:page?", cacheSuccessful, getStylesByOwner);
router.post("/style/add", addStyle);
router.put("/style/update/all", GHRateLimiter, updateAllStyles);
router.put("/style/update/:id", GHRateLimiter, updateStyle);
router.delete("/style/delete", deleteStyle);

module.exports = router;
