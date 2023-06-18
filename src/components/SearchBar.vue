<script setup lang="ts">
import { Icon } from '@iconify/vue';

type Props = {
  modelValue: string;
  error?: string;
  isLoading?: boolean;
};

defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'submit']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const onSubmit = () => {
  emit('submit');
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <label for="default-search" class="sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-4 sm:left-8 flex items-center pointer-events-none">
        <Icon icon="octicon:search-16" class="text-2xl text-df-blue" />
      </div>
      <input
        type="search"
        id="default-search"
        class="block shadow-md w-full py-6 px-12 sm:px-16 text-xs sm:text-sm text-df-text-light rounded-2xl bg-df-surface focus:ring-blue-500 focus:border-df-blue outline-1 outline-df-blue"
        placeholder="Search GitHub username…"
        required
        :value="modelValue"
        @input="updateValue"
      />
      <div
        class="gap-2 text-xs sm:text-sm absolute flex items-center inset-y-4 right-24 sm:right-32"
      >
        <span v-show="error" class="text-red-500 font-bold" data-testid="searchbar-error">
          <span class="hidden sm:flex">{{ error }}</span>
          <Icon icon="octicon:x-circle-fill-16" class="sm:hidden flex text-lg" />
        </span>
        <span v-show="isLoading">
          <Icon
            data-testid="searchbar-isLoading"
            icon="svg-spinners:3-dots-bounce"
            class="text-2xl text-df-blue"
          />
        </span>
      </div>
      <button
        type="submit"
        class="text-white font-bold absolute right-3 inset-y-2 sm:inset-y-2 bg-df-blue transition-colors ease-in-out hover:bg-df-blue-dark focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs px-4 sm:text-sm sm:px-6"
      >
        Search
      </button>
    </div>
  </form>
</template>
