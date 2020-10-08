const axios = require("axios");
const repoImages = require("repo-images");

const { Style } = require("../models/Style");
const { token } = require("../config").github;

async function retrieveRepositoryData(link) {
  let repoURL;
  let pathname;
  try {
    repoURL = new URL(link);
    pathname = repoURL.pathname;
  } catch (error) {
    return {
      status: 400,
      error: "Invalid URL",
    };
  }

  try {
    const config = { headers: { Authorization: `token ${token}` } };
    const [repo, contents] = await Promise.all([
      axios.get(`https://api.github.com/repos${pathname}`, config),
      axios.get(`https://api.github.com/repos${pathname}/contents`, config)
    ]);
    const usercss = contents.data.find(file => file.name.includes("user.css"));
    if (!usercss) {
      return {
        status: 400,
        error: "Repository does not contain usercss file"
      };
    }

    const images = await repoImages(pathname.substr(1), { token });
    let preview;
    if (images.length) {
      let previewObj = images.find((img) => img.path.includes("preview"));
      if (!previewObj) previewObj = images.reduce((a, b) => (a.size > b.size ? a : b));
      preview = `https://raw.githubusercontent.com${pathname}/master/${previewObj.path}`;
    }

    return {
      url: repo.data.html_url,
      usercss: usercss.download_url,
      preview,
      name: repo.data.name,
      description: repo.data.description,
      owner: repo.data.owner.login,
      created: repo.data.created_at,
      lastUpdate: repo.data.updated_at,
      stargazers: repo.data.stargazers_count,
      watchers: repo.data.subscribers_count,
      forks: repo.data.forks,
      issues: repo.data.open_issues,
      license: (repo.data.license && repo.data.license.spdx_id) || "",
      isPrivate: repo.data.private,
      isArchived: repo.data.archived,
      isFork: repo.data.fork
    };
  } catch (error) {
    if (!error.response) {
      console.log(error);
      return {
        status: 500,
        error: "Unhandled server error"
      };
    }
    return {
      status: error.response.status,
      error: error.response.statusText
    };
  }
}

function getStyles(req, res) {
  const { page = 1 } = req.params;
  let { sort } = req.query;

  if (req.query.sort === "stars") {
    sort = "-stargazers";
  } else if (req.query.sort === "update") {
    sort = "-lastUpdate";
  } else {
    sort = "-_id";
  }

  const customLabels = { totalDocs: "totalStyles", docs: "styles" };
  const options = {
    page,
    sort,
    customLabels,
    limit: 16,
    collation: { locale: "en" }
  };

  Style.paginate({}, options, (error, data) => {
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

function searchStyle(req, res) {
  const { page = 1 } = req.params;
  const customLabels = { totalDocs: "totalStyles", docs: "styles" };
  const options = {
    page,
    limit: 16,
    collation: { locale: "en" },
    customLabels
  };

  Style.paginate({ $text: { $search: req.query.query } }, options, (error, styles) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json(styles);
  });
}

function addStyle(req, res) {
  const { url } = req.body;

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
      if (saveError) return res.status(500).json({ error: saveError });
      return res.status(201).json({ style: newStyle });
    });
  });
}

function updateStyle(req, res) {
  const styleId = req.params.id;
  if (!styleId) return res.status(400).json({ error: "Request must contain styleId field" });

  Style.findById(styleId, async (error, style) => {
    if (error) return res.status(500).json({ error });
    if (!style) return res.status(404).json({ error: "Style was not found in our base" });

    const data = await retrieveRepositoryData(style.url);
    if (data.status === 404) return res.status(404).json({ error: "Repository was not found" });
    if (data.error) return res.status(data.status).json({ error: data.error });
    if (data.isPrivate) return res.status(403).json({ error: "Repository is private" });
    if (data.isArchived) return res.status(400).json({ error: "Repository is archived" });
    if (data.isFork) return res.status(400).json({ error: "Repository is forked" });

    Style.findByIdAndUpdate(
      styleId,
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
  Style.find({}).lean().exec(async (error, styles) => {
    if (error) return res.status(500).json({ error });

    try {
      const Bulk = Style.collection.initializeUnorderedBulkOp();
      const stylesArr = await Promise.all(styles.map(style => retrieveRepositoryData(style.url)));
      stylesArr.map(style => Bulk.find({ url: style.url }).update({ $set: style }));
      Bulk.execute((bulkError, result) => {
        if (bulkError) return res.status(500).json({ error: bulkError });
        return res.status(200).json({ result });
      });
    } catch (dataError) {
      return res.status(500).json({ error: dataError });
    }
  });
}

async function deleteStyle(req, res) {
  const { url } = req.body;
  const existingStyle = await Style.findOne({ url }).lean();
  if (!existingStyle) return res.status(404).json({ error: "Style does not exist" });

  Style.findOneAndDelete({ url }, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}

function getStylesByOwner(req, res) {
  const { owner, page = 1 } = req.params;
  if (!owner) return res.status(400).json({ error: "Request must contain repository owner" });

  const customLabels = { totalDocs: "totalStyles", docs: "styles" };
  const options = {
    page,
    limit: 16,
    collation: { locale: "en" },
    customLabels
  };

  Style.paginate({ owner }, options, (error, data) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  });
}

module.exports = {
  retrieveRepositoryData,
  getStyles,
  getStyleData,
  searchStyle,
  addStyle,
  updateStyle,
  updateAllStyles,
  deleteStyle,
  getStylesByOwner
};
