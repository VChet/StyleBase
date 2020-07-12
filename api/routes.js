const express = require("express");
const router = express.Router();

const {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  deleteStyle
} = require("../api/styles");

router.get("/styles", getStyles);
router.get("/style/:id", getStyleData);
router.post("/style/add", addStyle);
router.put("/style/update", updateStyle);
router.delete("/style/delete", deleteStyle);

module.exports = router;
