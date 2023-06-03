<script setup lang="ts">
import UserStatsItem from './UserStatsItem.vue';

type Props = {
  repos: number;
  followers: number;
  following: number;
};

defineProps<Props>();
</script>
<template>
  <ul
    class="flex justify-around w-full px-8 py-4 bg-slate-100 rounded-xl text-center sm:text-start"
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
</template>
