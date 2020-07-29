const axios = require("axios");
const repoImages = require("repo-images");

const { Style } = require("../models/style");

async function retrieveRepositoryData(link) {
  const repoURL = new URL(link);
  const { pathname } = repoURL;

  try {
    const [repo, contents] = await Promise.all([
      axios.get(`https://api.github.com/repos${pathname}`),
      axios.get(`https://api.github.com/repos${pathname}/contents`)
    ]);
    const usercss = contents.data.find(file => file.name.includes("user.css"));
    if (!usercss) {
      return {
        status: 400,
        error: "Repository does not contain usercss file"
      };
    }

    const images = await repoImages(pathname.substr(1));
    let preview;
    if (images.length) {
      const previewObj = images.reduce((a, b) => (a.size > b.size ? a : b));
      preview = `https://raw.githubusercontent.com${pathname}/master/${previewObj.path}`;
    }

    return {
      url: link,
      usercss: usercss.download_url,
      preview,
      name: repo.data.name.replace(/-/g, " "),
      description: repo.data.description,
      owner: repo.data.owner.login,
      lastUpdate: repo.data.updated_at,
      stargazers: repo.data.stargazers_count,
      watchers: repo.data.subscribers_count,
      forks: repo.data.forks,
      issues: repo.data.open_issues,
      license: repo.data.license,
      isPrivate: repo.data.private,
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

function getStyles(req, res) {
  // TODO: add pagination
  Style.find({}).lean().exec(async (error, styles) => {
    if (error) return res.status(500).json({ error });

    let stylesArr;
    try {
      stylesArr = await Promise.all(styles.map(style => retrieveRepositoryData(style.repoLink)));
      return res.status(200).json({ styles: stylesArr });
    } catch (dataError) {
      return res.status(dataError.response.status).json({ error: dataError.response.statusText });
    }
  });
}

function getStyleData(req, res) {
  Style.findById(req.params.id, async (error, style) => {
    if (error) return res.status(500).json({ error });

    const data = await retrieveRepositoryData(style.repoLink);
    if (data.error) return res.status(data.status).json({ error: data.error });

    res.status(200).json({ data });
  });
}

function addStyle(req, res) {
  const { repoLink } = req.body;

  Style.findOne({ repoLink }, async (error, style) => {
    if (error) return res.status(500).json({ error });
    if (style) {
      return res.status(409).json({ error: "Repository was already added to our base" });
    }
    const data = await retrieveRepositoryData(repoLink);
    if (data.isPrivate || data.status === 404) {
      return res.status(404).json({ error: "Repository was not found or private" });
    }
    if (data.error) return res.status(data.status).json({ error: data.error });
    if (data.isArchived) {
      return res.status(400).json({ error: "Repository is archived" });
    }
    if (data.isFork) {
      return res.status(400).json({ error: "Repository is forked" });
    }

    const newStyle = new Style({ repoLink });
    newStyle.save((saveError) => {
      if (saveError) return res.status(500).json({ error: saveError });
      return res.status(201).json({ style: newStyle });
    });
  });
}

function updateStyle(req, res) {
  const { styleId, ...styleData } = req.body;
  if (!styleId) return res.status(400).json({ error: "Request must contain styleId field" });

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
  const existingStyle = await Style.findById(styleId).lean();
  if (!existingStyle) return res.status(404).json({ error: "Style doesn't exist" });

  Style.findByIdAndRemove(styleId, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}

module.exports = {
  getStyles,
  getStyleData,
  addStyle,
  updateStyle,
  deleteStyle
};
