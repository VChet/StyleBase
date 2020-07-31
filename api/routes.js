const express = require("express");

const router = express.Router();

const {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  deleteStyle
} = require("./styles");

router.get("/styles", getStyles);
router.get("/style/:id", getStyleData);
router.post("/style/add", addStyle);
router.get("/style/update/:id", updateStyle);
router.delete("/style/delete", deleteStyle);

module.exports = router;
