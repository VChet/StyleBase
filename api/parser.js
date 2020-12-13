const axios = require("axios");
const repoImages = require("repo-images");

const { token } = require("../config").github;

const stylePattern = /\.user\.(css|styl)$/;

function getProviderData(url) {
  const providers = [
    {
      name: "GitHub",
      host: "github.com",
      api: "https://api.github.com",
      config: {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.mercy-preview+json"
        }
      }
    },
    {
      name: "Codeberg",
      host: "codeberg.org",
      api: "https://codeberg.org/api/v1",
      config: {}
    }
  ];
  const { host, pathname } = new URL(url);
  if (pathname === "/") throw new Error("Empty repository URL");

  const provider = providers.find((pr) => pr.host === host);
  if (!provider) throw new Error("Unsupported Git hosting provider");

  return {
    provider,
    repoUrl: pathname
  };
}

async function retrieveRepositoryFiles(url) {
  const { provider, repoUrl } = getProviderData(url);
  const contents = await axios.get(`${provider.api}/repos${repoUrl}/contents`, provider.config);
  const files = contents.data.filter((file) => stylePattern.test(file.name));
  return files;
}

async function collectGithubData(repo) {
  const branch = repo.data.default_branch;
  const images = await repoImages(repo.data.full_name, { token, branch });
  let preview;
  if (images.length) {
    let previewObj = images.find((img) => img.path.includes("preview"));
    if (!previewObj) previewObj = images.reduce((a, b) => (a.size > b.size ? a : b));
    preview = `https://raw.githubusercontent.com/${repo.data.full_name}/${branch}/${previewObj.path}`;
  }

  return {
    url: repo.data.html_url,
    preview,
    name: repo.data.name,
    description: repo.data.description,
    owner: {
      login: repo.data.owner.login,
      id: repo.data.owner.id
    },
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
}

function collectCodebergData(repo) {
  return {
    url: repo.data.html_url,
    name: repo.data.name,
    description: repo.data.description,
    owner: {
      login: repo.data.owner.login,
      id: repo.data.owner.id
    },
    created: repo.data.created_at,
    lastUpdate: repo.data.updated_at,
    stargazers: repo.data.stars_count,
    watchers: repo.data.watchers_count,
    forks: repo.data.forks_count,
    issues: repo.data.open_issues_count,
    license: (repo.data.license && repo.data.license.spdx_id) || "",
    isPrivate: repo.data.private,
    isArchived: repo.data.archived,
    isFork: repo.data.fork
  };
}

async function retrieveRepositoryData(url, usercss = null) {
  const { provider, repoUrl } = getProviderData(url);

  const repo = await axios.get(`${provider.api}/repos${repoUrl}`, provider.config);
  if (repo.data.private) throw new Error("Repository is private");
  if (repo.data.archived) throw new Error("Repository is archived");
  if (repo.data.fork) throw new Error("Repository is forked");

  let styleData;
  if (provider.name === "GitHub") {
    styleData = await collectGithubData(repo);
  } else {
    styleData = collectCodebergData(repo);
  }

  if (usercss) {
    styleData.usercss = usercss.download_url;
    styleData.name = usercss.name.replace(stylePattern, "").replace(/\s+/g, "-");
  }

  return styleData;
}

module.exports = {
  retrieveRepositoryFiles,
  retrieveRepositoryData
};
