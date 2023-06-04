<script setup lang="ts">
import { SearchBar, UserProfile } from '@/components';
import { useGithubProfile } from '@/composables/useGithubProfile';
import { onMounted, ref } from 'vue';

const searchText = ref('');
const { data, fetch, error } = useGithubProfile();

const onSubmit = async () => {
  await fetch(searchText.value);
};

onMounted(async () => {
  await fetch();
});
</script>
<template>
  <div class="min-h-screen flex flex-col sm:justify-center sm:items-center bg-slate-100">
    <div class="container flex flex-col gap-4 max-w-2xl lg:max-w-3xl px-4 py-6">
      <div>Page header</div>
      <div>
        <SearchBar v-model="searchText" @submit="onSubmit" :error="error?.message" />
      </div>
      <div v-if="data">
        <UserProfile v-bind="data" />
      </div>
    </div>
  </div>
</template>
