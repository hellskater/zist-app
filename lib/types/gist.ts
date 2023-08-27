export type Gist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Files;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: null;
  comments_url: string;
  owner: User;
  forks: any[]; // Empty array provided, so using any[] for now
  history: History[];
  truncated: boolean;
};

export type Files = {
  [filename: string]: GistFileType;
};

export type GistFileType = {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
};

export type CreateFiles = {
  [filename: string]: {
    content: string;
    language: string;
    filename: string;
  };
};

export type User = {
  name: string;
  bio: string;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  followers: number;
  public_gists: number;
};

type History = {
  user: User;
  version: string;
  committed_at: string;
  change_status: {
    total: number;
    additions: number;
    deletions: number;
  };
  url: string;
};

export type File = {
  id: string;
  filename: string;
  content: string;
  type: string;
  language: string;
};

export type GistData = {
  id: string;
  description: string;
  public: boolean;
  files: File[];
};

type ReturnValueFilesType = {
  [filename: string]: {
    content: string;
    language: string;
    filename: string;
    type: string;
    size: number;
    truncated: boolean;
    raw_url: string;
  };
};

export type SingleGistResponseData = {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: string;
  description: string;
  files: ReturnValueFilesType;
  forks: any[];
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  history: any[];
  html_url: string;
  id: string;
  owner: User;
  public: boolean;
  truncated: boolean;
  updated_at: string;
  url: string;
  user: any;
};
