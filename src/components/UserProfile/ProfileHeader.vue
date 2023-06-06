<script setup lang="ts">
import DateUtils from '@/utils/DateUtils';

type Props = {
  avatar: string;
  username: string;
  name: string | null;
  createdAt: string;
};

const props = defineProps<Props>();

const GITHUB_URL = 'https://github.com/';

const joinedAt = DateUtils.format(new Date(props.createdAt), {
  dateStyle: 'medium',
});
</script>
<template>
  <div class="col-span-2">
    <img :src="avatar" alt="Profile picture" class="rounded-full h-16 sm:h-32 aspect-square" />
  </div>
  <div class="grid self-center lg:self-start lg:grid-cols-2 col-span-6 h-fit gap-1">
    <div class="lg:order-1 font-bold sm:text-2xl lg:text-3xl text-xl">
      {{ name || username }}
    </div>
    <a
      :href="GITHUB_URL + username"
      class="lg:order-3 text-blue-500 lg:text-lg hover:underline underline-offset-4"
    >
      @{{ username }}
    </a>
    <div
      class="text-df-text-gray lg:order-2 lg:justify-self-end lg:self-start self-center py-2 lg:py-0"
    >
      Joined {{ joinedAt }}
    </div>
  </div>
</template>
