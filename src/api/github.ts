export const GITHUB_API_URL = 'https://api.github.com';

export const sanitizeUsername = (value: string) => {
  return value
    .match(/[A-Za-z]/gi)
    ?.join('')
    .toLocaleLowerCase();
};

export interface GithubProfileResponse {
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
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email?: any;
  hireable?: any;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const GET_USER_BY_USERNAME_URL = `${GITHUB_API_URL}/users`;

export const getUserByUsername = async (username: string) => {
  const response = await fetch(`${GET_USER_BY_USERNAME_URL}/${sanitizeUsername(username)}`);

  if (!response.ok) {
    throw new Error('No results');
  }

  const data: GithubProfileResponse = await response.json();

  return data;
};
