<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
  <div class="flex justify-between items-center font-bold">
    <span class="sm:text-2xl lg:text-3xl text-xl">devfinder</span>
    <button
      class="flex gap-2 items-center px-6 py-3 rounded-lg text-slate-500 hover:bg-slate-200 uppercase"
    >
      dark <Icon icon="iconamoon:mode-dark-fill" class="text-xl" />
    </button>
  </div>
</template>
