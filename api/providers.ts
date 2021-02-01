import type { Provider } from "../types/server";

import config from "../config";

export default [
  {
    name: "GitHub",
    host: "github.com",
    api: "https://api.github.com",
    idField: "githubId",
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
    idField: "codebergId",
    options: {}
  }
] as Array<Provider>;
