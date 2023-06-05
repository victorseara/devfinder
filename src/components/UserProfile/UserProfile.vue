<script setup lang="ts">
import ProfileHeader from './ProfileHeader.vue';
import UserInfoItem from './UserInfoItem.vue';
import UserStatsItem from './UserStatsItem.vue';

type Props = {
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

defineProps<Props>();
</script>
<template>
  <div
    class="grid grid-cols-8 sm:grid-cols-8 drop-shadow-xl text-xs px-6 py-8 bg-df-surface rounded-2xl gap-8 lg:gap-0 sm:text-base sm:p-8 lg:p-12"
  >
    <div class="grid grid-cols-8 col-span-8 gap-4">
      <ProfileHeader :avatar="avatar" :created-at="createdAt" :username="username" :name="name" />
    </div>
    <div class="col-span-full lg:grid lg:col-start-3 lg:-mt-2">
      <p class="text-df-text-light" :class="!bio && 'opacity-75'">
        {{ bio || 'This profile has no bio' }}
      </p>
    </div>
    <div class="grid grid-flow-col my-5 sm:my-10 col-span-8 lg:col-start-3">
      <ul
        class="flex justify-around w-full px-8 py-4 bg-df-bg rounded-xl text-center sm:text-start"
      >
        <UserStatsItem label="Repos">
          {{ repos }}
        </UserStatsItem>
        <UserStatsItem label="Followers">
          {{ followers }}
        </UserStatsItem>
        <UserStatsItem label="Following">
          {{ following }}
        </UserStatsItem>
      </ul>
    </div>
    <ul class="col-span-8 lg:col-start-3 grid sm:grid-cols-2 gap-5">
      <UserInfoItem icon="octicon:location-16" :content="location" />
      <UserInfoItem icon="fa6-brands:twitter" :content="twitter" />
      <UserInfoItem icon="octicon:link-16" :content="website" />
      <UserInfoItem icon="octicon:organization-16" :content="company" />
    </ul>
  </div>
</template>
