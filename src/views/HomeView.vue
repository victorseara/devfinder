<script setup lang="ts">
import { PageHeader, SearchBar, UserProfile } from '@/components';
import { useGithubProfile } from '@/composables/useGithubProfile';
import { onMounted, ref } from 'vue';

const searchText = ref('');
const { data, doFetch, isLoading, error } = useGithubProfile();

const onSubmit = async () => {
  await doFetch(searchText.value);
};

onMounted(async () => {
  await doFetch();
});
</script>
<template>
  <div class="min-h-screen flex flex-col sm:justify-center sm:items-center bg-df-bg text-df-text">
    <div class="container flex flex-col gap-4 sm:gap-6 max-w-2xl lg:max-w-3xl px-4 py-6">
      <div>
        <PageHeader />
      </div>
      <div>
        <SearchBar
          v-model="searchText"
          @submit="onSubmit"
          :error="error?.message"
          :is-loading="isLoading"
        />
      </div>
      <div v-if="data">
        <UserProfile v-bind="data" />
      </div>
    </div>
  </div>
</template>
