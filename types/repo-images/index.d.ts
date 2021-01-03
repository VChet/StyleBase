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
