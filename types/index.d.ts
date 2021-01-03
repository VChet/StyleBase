declare module "passport-gitea" {
  import passport = require("passport");
  import oauth2 = require("passport-oauth2");
  import express = require("express");
  import { OutgoingHttpHeaders } from "http";

  export interface Profile extends passport.Profile {
    profileUrl: string;
  }

  export interface StrategyOption extends passport.AuthenticateOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;

    scope?: string[];
    userAgent?: string;

    authorizationURL?: string;
    tokenURL?: string;
    scopeSeparator?: string;
    customHeaders?: OutgoingHttpHeaders;
    userProfileURL?: string;
    userEmailURL?: string;
  }

  export type OAuth2StrategyOptionsWithoutRequiredURLs = Pick<
  oauth2._StrategyOptionsBase,
  Exclude<keyof oauth2._StrategyOptionsBase, "authorizationURL" | "tokenURL">
  >;

  export interface _StrategyOptionsBase extends OAuth2StrategyOptionsWithoutRequiredURLs {
    clientID: string;
    clientSecret: string;
    callbackURL: string;

    scope?: string[];
    userAgent?: string;
    state?: string;

    authorizationURL?: string;
    tokenURL?: string;
    scopeSeparator?: string;
    customHeaders?: OutgoingHttpHeaders;
    userProfileURL?: string;
    userEmailURL?: string;
  }

  export interface StrategyOptions extends _StrategyOptionsBase {
    passReqToCallback?: false;
  }
  export interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
    passReqToCallback: true;
  }

  export class Strategy extends oauth2.Strategy {
    constructor(options: StrategyOptions, verify: oauth2.VerifyFunction);
    constructor(options: StrategyOptionsWithRequest, verify: oauth2.VerifyFunctionWithRequest);
    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): void;

    name: string;
    authenticate(req: express.Request, options?: passport.AuthenticateOptions): void;
  }
}

declare module "repo-images" {
  export interface repoOptions {
    token?: string;
    access_token?: string;
    branch?: string;
  }

  export interface Image {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
    rawgit: string;
  }

  export default function (repo: string, opts: repoOptions, callback?: Function): Promise<Array<Image>>;
}

declare module "usercss-meta" {
  interface ParseError {
    name: string;
    code: string;
    message: string;
    index: number;
  }

  interface ParseResults {
    metadata: {
      name: string;
      version: string;
      namespace: string;
      author: string;
      description: string;
      homepageURL: string;
      supportURL: string;
      updateURL: string;
      license: string;
      preprocessor: string;
    };
    errors: Array<ParseError>;
  }

  export interface MetaParser {
    parse(text: string, options?: any): ParseResults;
  }

  const metaParser: MetaParser;
  export default metaParser;
}
