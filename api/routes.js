const express = require("express");

const router = express.Router();

const {
  getStyles,
  getStyleData,
  searchStyle,
  addStyle,
  updateAllStyles,
  updateStyle,
  deleteStyle
} = require("./styles");

router.get("/styles/:page?", getStyles);
router.get("/style/:id", getStyleData);
router.get("/search", searchStyle);
router.post("/style/add", addStyle);
router.get("/style/update/all", updateAllStyles);
router.get("/style/update/:id", updateStyle);
router.delete("/style/delete", deleteStyle);

module.exports = router;
