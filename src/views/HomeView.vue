<script setup lang="ts">
import { SearchBar, UserProfile } from '@/components';
import { onMounted, ref } from 'vue';

interface GithubUser {
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

type User = {
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
};

const searchText = ref('');
const userProfile = ref(null as User | null);
const errorMessage = ref('');

const getUserByUsername = async (username = 'octocat') => {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    errorMessage.value = 'No results';
    return;
  }

  const data = (await response.json()) as GithubUser;

  const user = {
    avatar: data.avatar_url,
    createdAt: data.created_at,
    username: data.login,
    name: data.name,
    bio: data.bio,
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    location: data.location,
    twitter: data.twitter_username,
    company: data.company,
    website: data.blog,
  };

  errorMessage.value = '';
  userProfile.value = user;
};

const onSubmit = async () => {
  await getUserByUsername(searchText.value);
};

onMounted(async () => {
  await getUserByUsername();
});
</script>
<template>
  <div class="min-h-screen flex flex-col sm:justify-center sm:items-center bg-slate-100">
    <div class="container flex flex-col gap-4 max-w-2xl lg:max-w-3xl px-4 py-6">
      <div>Page header</div>
      <div>
        <SearchBar v-model="searchText" @submit="onSubmit" :error-message="errorMessage" />
      </div>
      <div v-if="userProfile"><UserProfile v-bind="userProfile" /></div>
    </div>
  </div>
</template>
