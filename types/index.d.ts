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
  /** Options {@link https://github.com/openstyles/usercss-meta#createparser|documentation} */
  interface ParseOptions {
    unknownKey?: string;
    mandatoryKeys?: Array<string>;
    parseKey?: object;
    parseVar?: object;
    validateKey?: object;
    validateVar?: object;
    allowErrors?: boolean;
  }

  interface ParseError {
    name: string;
    code: string;
    message: string;
    index: number;
  }

  interface ParseResults {
    metadata: {
      /**
       * The name of UserCSS style.
       * The combination of @name and @namespace must be unique for each UserCSS.
       */
      name: string;
      /**
       * The namespace of the UserCSS.
       * Helps to distinguish between styles with the same name.
       * Usually, the author's nickname or homepage. Can contain spaces and special characters.
       */
      namespace: string;
      /**
       * The version of the style.
       * This is used for the update check.
       * Follow {@link http://semver.org/|semver} versioning.
       */
      version: string;
      /** A short significant description. */
      description?: string;
      /** Info about the author of the UserCSS style. */
      author?: string;
      /**
       * The project's homepage.
       * This is used in Stylus' Manage and Edit pages to link to UserCSS source.
       */
      homepageURL?: string;
      /** The URL the user can report issues to the UserCSS author. */
      supportURL?: string;
      /**
       * When defined, this URL is used when updating the style.
       * Otherwise the style is updated from where it was installed.
       */
      updateURL?: string;
      /**
       * License based on the
       * {@link https://spdx.org/licenses|SPDX license identifier}.
       */
      license?: string;
      /** An applied CSS preprocessor. */
      preprocessor?: string;
      /**
       * A live-switchable variable which will be compiled to valid CSS
       * according to the preprocessor that is set.
       */
      var?: string;
    };
    errors: Array<ParseError>;
  }

  interface MetaParser {
    parse(text: string, options?: ParseOptions): ParseResults;
  }

  const metaParser: MetaParser;
  export default metaParser;
}
