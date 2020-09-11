const express = require("express");
const apicache = require("apicache");

const router = express.Router();
const cache = apicache.middleware;

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccessful = cache("10 minutes", onlyStatus200);

const {
  getStyles,
  getStyleData,
  searchStyle,
  addStyle,
  updateAllStyles,
  updateStyle,
  deleteStyle,
  getStylesByAuthor
} = require("./styles");

router.get("/styles/:page?", cacheSuccessful, getStyles);
router.get("/style/:id", cacheSuccessful, getStyleData);
router.get("/search", searchStyle);
router.post("/style/add", addStyle);
router.put("/style/update/all", updateAllStyles);
router.put("/style/update/:id", updateStyle);
router.delete("/style/delete", deleteStyle);
router.get("/author/:author/:page?", getStylesByAuthor);

module.exports = router;
