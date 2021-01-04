import axios from "axios";
import repoImages from "repo-images";
import metaParser from "usercss-meta";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IStyle } from "../models/Style";
import type { GitHubRepository, CodebergRepository, File } from "../types/api";
import type { Provider } from "../types/server";

import config from "../config";

const stylePattern = /\.user\.(css|styl)$/;

function getProviderData(url: string) {
  const providers: Array<Provider> = [
    {
      name: "GitHub",
      host: "github.com",
      api: "https://api.github.com",
      options: {
        headers: {
          Authorization: `token ${config.github.token}`,
          Accept: "application/vnd.github.mercy-preview+json"
        }
      }
    },
    {
      name: "Codeberg",
      host: "codeberg.org",
      api: "https://codeberg.org/api/v1",
      options: {}
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

export async function retrieveRepositoryFiles(url: string) {
  const { provider, repoUrl } = getProviderData(url);
  const contents: AxiosResponse<Array<File>> = await axios.get(
    `${provider.api}/repos${repoUrl}/contents`,
    provider.options
  );
  return contents.data.filter((file) => stylePattern.test(file.name));
}

async function retrieveStyleMetadata(fileUrl: string, options: AxiosRequestConfig) {
  try {
    const content = await axios.get(fileUrl, options);
    const data = metaParser.parse(content.data);
    if (data.errors.length) console.log(data.errors);
    return data.metadata;
  } catch (error) {
    throw new Error(error);
  }
}

async function collectGithubData(repo: GitHubRepository) {
  const branch = repo.default_branch;
  const images = await repoImages(repo.full_name, { token: config.github.token, branch });
  let preview: string | undefined;
  if (images.length) {
    let previewObj = images.find((img) => img.path.includes("preview"));
    if (!previewObj) previewObj = images.reduce((a, b) => (a.size > b.size ? a : b));
    preview = `https://raw.githubusercontent.com/${repo.full_name}/${branch}/${previewObj.path}`;
  }

  return {
    url: repo.html_url,
    preview,
    name: repo.name,
    description: repo.description,
    owner: {
      login: repo.owner.login,
      id: repo.owner.id
    },
    created: repo.created_at,
    lastUpdate: repo.updated_at,
    topics: repo.topics,
    stargazers: repo.stargazers_count,
    watchers: repo.subscribers_count,
    forks: repo.forks,
    issues: repo.open_issues,
    license: (repo.license && repo.license.spdx_id) || "",
    isPrivate: repo.private,
    isArchived: repo.archived,
    isFork: repo.fork
  };
}

function collectCodebergData(repo: CodebergRepository) {
  return {
    url: repo.html_url,
    name: repo.name,
    description: repo.description,
    owner: {
      login: repo.owner.login,
      id: repo.owner.id
    },
    created: repo.created_at,
    lastUpdate: repo.updated_at,
    stargazers: repo.stars_count,
    watchers: repo.watchers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    isPrivate: repo.private,
    isArchived: repo.archived,
    isFork: repo.fork
  };
}

export async function retrieveRepositoryData(url: string, usercss: Pick<File, "download_url"> | null = null) {
  const { provider, repoUrl } = getProviderData(url);

  const repo = await axios.get(`${provider.api}/repos${repoUrl}`, provider.options);
  if (repo.data.private) throw new Error(`${repo.data.name} repository is private`);
  if (repo.data.archived) throw new Error(`${repo.data.name} repository is archived`);
  if (repo.data.fork) throw new Error(`${repo.data.name} repository is forked`);

  let styleData: Partial<IStyle>;
  if (provider.name === "GitHub") {
    styleData = await collectGithubData(repo.data);
  } else {
    styleData = collectCodebergData(repo.data);
  }

  if (usercss) {
    const metadata = await retrieveStyleMetadata(usercss.download_url, provider.options).catch((error) => {
      throw new Error(`${repo.data.owner.login}/${repo.data.name}. ${error.message}`);
    });
    styleData.usercss = usercss.download_url;
    styleData.name = metadata.name.replace(/\s+/g, "_").replace(/[^a-z\d-_()[\]]/gi, "-");
    if (metadata.description) styleData.description = metadata.description;
    if (metadata.license) styleData.license = metadata.license;
  }

  return styleData;
}
