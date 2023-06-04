import { ref } from 'vue';

interface GithubProfileResponse {
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

export interface GithubProfile {
  avatar: string;
  createdAt: string;
  username: string;
  name: string | null;
  bio: string | null;
  repos: number;
  followers: number;
  following: number;
  location: string | null;
  twitter: string | null;
  company: string | null;
  website: string | null;
}

export const useGithubProfile = () => {
  const data = ref(null as GithubProfile | null);
  const error = ref(null as Error | null);
  const isLoading = ref(false);

  const getUserByUsername = async (username = 'octocat') => {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      isLoading.value = false;
      error.value = new Error('No results');
      return;
    }

    const responseData = (await response.json()) as GithubProfileResponse;

    const user: GithubProfile = {
      avatar: responseData.avatar_url,
      createdAt: responseData.created_at,
      username: responseData.login,
      name: responseData.name,
      bio: responseData.bio,
      repos: responseData.public_repos,
      followers: responseData.followers,
      following: responseData.following,
      location: responseData.location,
      twitter: responseData.twitter_username,
      company: responseData.company,
      website: responseData.blog,
    };

    data.value = user;
    isLoading.value = false;
    error.value = null;
  };

  return {
    data,
    error,
    isLoading,
    fetch: getUserByUsername,
  };
};
