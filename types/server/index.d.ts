import { Send } from "express";
import { SessionOptions } from "express-session"
import { IStyle } from "../../models/Style";
import { IUser } from "../../models/User";

export interface Config {
  appPort: string;
  mongoUrl: string;
  session: SessionOptions;
  github: {
    /**
     * OAuth data, obtained from
     *
     * https://github.com/settings/developers
     *
     * https://codeberg.org/user/settings/applications/oauth2
     */
    OAuth: {
      clientId: string;
      clientSecret: string;
    }
    /**
     * User token with public_repo scope
     *
     * https://github.com/settings/tokens
     *
     * https://codeberg.org/user/settings/applications
     */
    token: string
  },
  codeberg: {
    OAuth: {
      clientId: string;
      clientSecret: string;
    }
    token: string;
  }
}

export interface Provider {
  name: string;
  host: string;
  api: string;
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
      styleData?: IStyle
    }
    interface Response {
      sendResponse: Send
    }
  }
}
