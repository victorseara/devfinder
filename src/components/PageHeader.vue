<script setup lang="ts">
import { useTheme } from '@/composables';
import { Icon } from '@iconify/vue';

const { onToggleTheme, theme } = useTheme();
</script>
<template>
  <div class="flex justify-between items-center font-bold">
    <span class="sm:text-2xl lg:text-3xl text-xl">devfinder</span>
    <button
      @click="onToggleTheme"
      class="flex gap-2 items-center px-6 py-3 rounded-lg text-df-text-gray transition-colors ease-in-out hover:text-df-text uppercase"
    >
      {{ theme.name }} <Icon :icon="theme.icon" class="text-xl" />
    </button>
  </div>
</template>
