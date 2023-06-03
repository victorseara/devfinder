<script setup lang="ts">
import UserInfoItem from './UserInfoItem.vue';

type Props = {
  location: string | null;
  twitter: string | null;
  blog: string | null;
  company: string | null;
};
/* */
defineProps<Props>();
</script>
<template>
  <ul class="grid sm:grid-cols-2 gap-5">
    <UserInfoItem icon="octicon:location-16" :content="location" />
    <UserInfoItem icon="fa6-brands:twitter" :content="twitter" />
    <UserInfoItem icon="octicon:link-16" :content="blog" />
    <UserInfoItem icon="octicon:organization-16" :content="company" />
  </ul>
</template>
