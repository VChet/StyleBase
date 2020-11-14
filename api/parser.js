const axios = require("axios");
const repoImages = require("repo-images");

const { token } = require("../config").github;

async function retrieveRepositoryFiles(url) {
  let repoUrl;
  try {
    repoUrl = new URL(url).pathname;
  } catch (error) {
    return { status: 400, error: "Invalid URL" };
  }

  const config = {
    headers: { Authorization: `token ${token}` }
  };

  const contents = await axios.get(`https://api.github.com/repos${repoUrl}/contents`, config);
  const stylePattern = /\.user\.(css|styl)$/;
  const files = contents.data.filter((file) => stylePattern.test(file.name));
  return files;
}

async function retrieveRepositoryData(url, usercss = null) {
  let repoUrl;
  try {
    repoUrl = new URL(url).pathname;
  } catch (error) {
    return { status: 400, error: "Invalid URL" };
  }

  try {
    const config = {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.mercy-preview+json"
      }
    };
    const repo = await axios.get(`https://api.github.com/repos${repoUrl}`, config);
    const branch = repo.data.default_branch;
    const images = await repoImages(repoUrl.substr(1), { token, branch });
    let preview;
    if (images.length) {
      let previewObj = images.find((img) => img.path.includes("preview"));
      if (!previewObj) previewObj = images.reduce((a, b) => (a.size > b.size ? a : b));
      preview = `https://raw.githubusercontent.com${repoUrl}/${branch}/${previewObj.path}`;
    }

    const styleData = {
      url: repo.data.html_url,
      preview,
      name: repo.data.name,
      description: repo.data.description,
      owner: repo.data.owner.login,
      created: repo.data.created_at,
      lastUpdate: repo.data.updated_at,
      topics: repo.data.topics,
      stargazers: repo.data.stargazers_count,
      watchers: repo.data.subscribers_count,
      forks: repo.data.forks,
      issues: repo.data.open_issues,
      license: (repo.data.license && repo.data.license.spdx_id) || "",
      isPrivate: repo.data.private,
      isArchived: repo.data.archived,
      isFork: repo.data.fork
    };

    if (usercss) {
      styleData.usercss = usercss.download_url;
      styleData.name = usercss.name.replace(/\s+/g, "-");
    }

    return styleData;
  } catch (error) {
    if (!error.response) {
      console.log(error);
      return { status: 500, error: "Unhandled server error" };
    }
    return {
      status: error.response.status || error.response.statusCode,
      error: error.response.statusText || error.response.statusMessage
    };
  }
}

module.exports = {
  retrieveRepositoryFiles,
  retrieveRepositoryData
};
