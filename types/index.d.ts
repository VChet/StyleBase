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
