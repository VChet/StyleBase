module.exports = {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  deleteStyle
};

const axios = require("axios");

const { Style } = require("../models/style");

function getStyles(req, res) {
  Style.find().exec((error, styles) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ styles });
  });
}

async function retrieveRepositoryData(link) {
  const repoURL = new URL(link);
  const pathname = repoURL.pathname;

  try {
    const [contents, repo] = await Promise.all([
      axios.get(`https://api.github.com/repos${pathname}/contents`),
      axios.get(`https://api.github.com/repos${pathname}`)
    ]);
    const usercss = contents.data.find(file => file.name.includes("user.css"));

    return {
      url: link,
      usercss: usercss.download_url,
      name: repo.data.name.replace(/-/g, " "),
      description: repo.data.description,
      owner: repo.data.owner.login,
      lastUpdate: repo.data.updated_at,
      stargazers: repo.data.stargazers_count,
      watchers: repo.data.subscribers_count,
      forks: repo.data.forks,
      issues: repo.data.open_issues,
      license: repo.data.license,
      isArchived: repo.data.archived,
      isFork: repo.data.fork
    };
  } catch (error) {
    return {
      status: error.response.status,
      error: error.response.statusText
    };
  }
}

function getStyleData(req, res) {
  Style.findById(req.params.id, async (error, style) => {
    if (error) return res.status(500).json({ error });

    const data = await retrieveRepositoryData(style.repoLink);
    if (data.error) return res.status(data.status).json({ error: data.error });

    res.status(200).json({ data });
  });
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
