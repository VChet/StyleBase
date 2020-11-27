const { Style } = require("../models/Style");
const { retrieveRepositoryData } = require("./parser");

function getStyles(req, res) {
  const { query, page = 1, sort } = req.query;
  const { owner } = req.params;

  let filter = {};
  if (query) filter = { $text: { $search: req.query.query } };
  if (owner) filter = { owner };

  let sortOrder = "-_id";
  if (sort === "stargazers") {
    sortOrder = "-stargazers";
  } else if (sort === "lastUpdate") {
    sortOrder = "-lastUpdate";
  }

  const customLabels = { totalDocs: "totalStyles", docs: "styles" };
  const options = {
    page,
    customLabels,
    sort: sortOrder,
    limit: 16,
    lean: true,
    collation: { locale: "en" }
  };

  Style.paginate(filter, options, (error, data) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  });
}

function getStyleData(req, res) {
  const { owner, name } = req.query;
  if (!owner || !name) return res.status(400).json({ error: "Request must contain owner and name fields" });
  Style.findOne({ owner, name }, (error, style) => {
    if (error) return res.status(500).json({ error });
    if (!style) return res.status(404).json({ error: "Style not found" });
    return res.status(200).json({ style });
  });
}

function addStyle(req, res) {
  let { url } = req.body;
  url = url.replace(/\/$/, ""); // Trim trailing slash

  Style.findOne({ url }, async (error, style) => {
    if (error) return res.status(500).json({ error });
    if (style) return res.status(409).json({ error: "Repository was already added to our base" });

    const data = await retrieveRepositoryData(url);
    if (data.status === 404) return res.status(404).json({ error: "Repository was not found" });
    if (data.error) return res.status(data.status).json({ error: data.error });
    if (data.isPrivate) return res.status(403).json({ error: "Repository is private" });
    if (data.isArchived) return res.status(400).json({ error: "Repository is archived" });
    if (data.isFork) return res.status(400).json({ error: "Repository is forked" });

    const newStyle = new Style(data);
    newStyle.save((saveError) => {
      if (saveError) return res.status(500).json({ error: `${saveError.code}: ${saveError.name}` });
      return res.status(201).json({ style: newStyle });
    });
  });
}

function updateStyle(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Request must contain url field" });

  Style.findOne({ url }, async (error, style) => {
    if (error) return res.status(500).json({ error });
    if (!style) return res.status(404).json({ error: "Style was not found in our base" });

    const data = await retrieveRepositoryData(style.url);
    if (data.status === 404) return res.status(404).json({ error: "Repository was not found" });
    if (data.error) return res.status(data.status).json({ error: data.error });
    if (data.isPrivate) return res.status(403).json({ error: "Repository is private" });
    if (data.isArchived) return res.status(400).json({ error: "Repository is archived" });
    if (data.isFork) return res.status(400).json({ error: "Repository is forked" });

    Style.findOneAndUpdate(
      { url },
      data,
      { new: true },
      (updateError, newStyle) => {
        if (updateError) return res.status(500).json({ error: updateError });
        return res.status(200).json({ style: newStyle });
      }
    );
  });
}

function updateAllStyles(req, res) {
  Style.updateAllStyles()
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ error }));
}

function editStyle(req, res) {
  const { url, ...customData } = req.body;

  if (customData.customPreview) {
    try {
      const previewUrl = new URL(customData.customPreview);
      const imagePattern = /\.(png|gif|jpg|svg|bmp|icns|ico|sketch)$/i;
      if (!previewUrl.protocol.includes("https:")) {
        return res.status(400).json({ error: "Preview must be from a secure source" });
      }
      if (!imagePattern.test(previewUrl.pathname)) {
        return res.status(415).json({ error: "Preview file must be an image" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid preview URL" });
    }
  }

  // Remove non-custom fields
  Object.keys(customData).forEach(key => {
    const fieldToDelete = !["customName", "customPreview"].includes(key);
    return fieldToDelete && delete customData[key];
  });

  Style.findOneAndUpdate(
    { url },
    { $set: customData },
    { new: true },
    (error, style) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ style });
    });
}

async function deleteStyle(req, res) {
  Style.findOneAndDelete({ url: req.body.url }, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}

module.exports = {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  updateAllStyles,
  editStyle,
  deleteStyle
};
