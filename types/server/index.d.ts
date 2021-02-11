import type { Send } from "express";
import type { SessionOptions } from "express-session";
import type { IStyle } from "../../models/Style";
import type { IUser } from "../../models/User";

export interface Config {
  appPort: string;
  mongoUrl: string;
  session: SessionOptions;
  github: {
    /**
     * OAuth data, obtained from
     * {@link https://github.com/settings/developers|GitHub}
     */
    OAuth: {
      clientId: string;
      clientSecret: string;
    }
    /**
     * User token with public_repo scope, obtained from
     * {@link https://github.com/settings/tokens|GitHub}
     */
    token: string
  },
  codeberg: {
    /**
     * OAuth data, obtained from
     * {@link https://codeberg.org/user/settings/applications/oauth2|Codeberg}
     */
    OAuth: {
      clientId: string;
      clientSecret: string;
    }
    /**
     * User token with public_repo scope, obtained from
     * {@link https://codeberg.org/user/settings/applications|Codeberg}
     */
    token: string;
  }
}

export type ProviderName = "GitHub" | "Codeberg";

export interface Provider {
  name: ProviderName;
  host: string;
  api: string;
  idField: "githubId" | "codebergId";
  options: {
    headers?: {
      Authorization: string;
      Accept: string;
    }
  }
}

declare global {
  namespace Express {
    interface User extends IUser { }
    interface Request {
      styleData?: Partial<IStyle>
    }
    interface Response {
      sendResponse: Send
    }
  }
}
