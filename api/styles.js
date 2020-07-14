module.exports = {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  deleteStyle
};

const { Style } = require("../models/style");

function getStyles(req, res) {
  Style.find().exec((error, styles) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ styles });
  });
}

function getStyleData(req, res) {
  // TODO: to be implemented
  return res.status(500).json({ error: 'Method is not supported' });
}

async function addStyle(req, res) {
  // TODO: check is not fork, is not private
  const { repoLink } = req.body;

  Style.findOne({ repoLink }, (error, style) => {
    if (error) return res.status(500).json({ error });
    if (style) {
      return res.status(409).json({ error: `This repository was already added to our base` });
    }

    const newStyle = new Style({ repoLink });
    newStyle.save(error => {
      if (error) return res.status(500).json({ error });
      return res.status(201).json({ style: newStyle });
    });
  });
}

function updateStyle(req, res) {
  const { styleId, ...styleData } = req.body;
  if (!styleId) return res.status(400).json({
    error: "Request must contain styleId field"
  });

  Style.findByIdAndUpdate(
    styleId,
    styleData,
    { new: true },
    (error, newStyle) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ style: newStyle });
    }
  );
}

async function deleteStyle(req, res) {
  const { styleId } = req.body;
  const style = await Style.findById(styleId).lean();
  if (!style) return res.status(404).json({ error: "Style doesn't exist" });

  Style.findByIdAndRemove(styleId, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}
