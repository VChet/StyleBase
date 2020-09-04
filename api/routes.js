const express = require("express");

const router = express.Router();

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

router.get("/styles/:page?", getStyles);
router.get("/style/:id", getStyleData);
router.get("/search", searchStyle);
router.post("/style/add", addStyle);
router.put("/style/update/all", updateAllStyles);
router.put("/style/update/:id", updateStyle);
router.delete("/style/delete", deleteStyle);
router.get("/author/:author/:page?", getStylesByAuthor);

module.exports = router;
