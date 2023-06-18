import { getUserByUsername, type GithubProfileResponse } from '@/api/github';
import { ref } from 'vue';

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

export const DEFAULT_USERNAME = 'octocat';
export const UNEXPECTED_ERROR_MESSAGE = 'Oops, unexpected error occurred!';

export const parseResponseToGithubProfile = (responseData: GithubProfileResponse) => {
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

  return user;
};

export const useGithubProfile = () => {
  const data = ref(null as GithubProfile | null);
  const error = ref(null as Error | null);
  const isLoading = ref(false);

  const doFetch = async (username = DEFAULT_USERNAME) => {
    isLoading.value = true;

    try {
      const responseData = await getUserByUsername(username);

      const user = parseResponseToGithubProfile(responseData);

      data.value = user;
      error.value = null;
    } catch (exception) {
      if (exception instanceof Error) {
        error.value = exception;
        return;
      }

      error.value = new Error(UNEXPECTED_ERROR_MESSAGE);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    error,
    isLoading,
    doFetch,
  };
};
