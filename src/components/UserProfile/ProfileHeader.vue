<script setup lang="ts">
import DateUtils from '@/utils/DateUtils';

type Props = {
  avatar: string;
  username: string;
  name: string | null;
  createdAt: string;
};

const props = defineProps<Props>();

const joinedAt = DateUtils.format(new Date(props.createdAt), {
  dateStyle: 'medium',
  formatMatcher: 'best fit',
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
    <div class="lg:order-3 text-blue-500 lg:text-lg">@{{ username }}</div>
    <div class="lg:order-2 lg:justify-self-end self-center py-2 lg:py-0">Joined {{ joinedAt }}</div>
  </div>
</template>
