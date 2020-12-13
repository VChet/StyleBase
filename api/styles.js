const { Style } = require("../models/Style");
const {
  retrieveRepositoryFiles,
  retrieveRepositoryData
} = require("./parser");

function handleParserError(res, error) {
  if (error.response) {
    return res.status(error.response.status).json({ error: error.response.statusText });
  }
  if (error.message) {
    return res.status(400).json({ error: error.message });
  }
  console.log(error);
  res.status(500).json({ error: "Unhandled server error" });
}

function getRepositoryFiles(req, res) {
  let { url } = req.query;
  url = url.replace(/\/$/, ""); // Trim trailing slash

  retrieveRepositoryFiles(url)
    .then((files) => {
      if (!files.length) return res.status(400).json({ error: "Repository does not contain UserCSS files" });
      res.status(200).json({ files });
    })
    .catch((error) => {
      handleParserError(res, error);
    });
}

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
  const { usercss } = req.body;
  url = url.replace(/\/$/, ""); // Trim trailing slash

  Style.findOne({ usercss: usercss.download_url }, async (mongoError, style) => {
    if (mongoError) return res.status(500).json({ error: mongoError });
    if (style) return res.status(409).json({ error: "Style was already added to our base" });

    retrieveRepositoryData(url, usercss)
      .then((data) => {
        const newStyle = new Style(data);
        newStyle.save((saveError) => {
          if (saveError) return res.status(500).json({ error: `${saveError.name}: ${saveError.code}` });
          res.status(201).json({ style: newStyle });
        });
      })
      .catch((error) => {
        handleParserError(res, error);
      });
  });
}

function updateStyle(req, res) {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ error: "Request must contain _id field" });

  Style.findById(_id, async (mongoError, style) => {
    if (mongoError) return res.status(500).json({ error: mongoError });
    if (!style) return res.status(404).json({ error: "Style was not found in our base" });

    retrieveRepositoryData(style.url)
      .then((data) => {
        delete data.name;
        Style.findByIdAndUpdate(_id, data, { new: true }, (updateError, result) => {
          if (updateError) return res.status(500).json({ error: updateError });
          return res.status(200).json({ result });
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
}

function updateAllStyles(req, res) {
  Style.updateAllStyles()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      handleParserError(res, error);
    });
}

function editStyle(req, res) {
  const {
    _id, customName, customDescription, customPreview
  } = req.body;

  if (customPreview) {
    try {
      const previewUrl = new URL(customPreview);
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

  Style.findByIdAndUpdate(
    _id,
    { $set: { customName, customDescription, customPreview } },
    { new: true },
    (error, style) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ style });
    });
}

async function deleteStyle(req, res) {
  Style.findByIdAndDelete(req.body._id, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}

module.exports = {
  getRepositoryFiles,
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  updateAllStyles,
  editStyle,
  deleteStyle
};
