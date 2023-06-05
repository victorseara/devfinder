<script setup lang="ts">
type Props = {
  label: string;
};

defineProps<Props>();
</script>
<template>
  <li>
    <div class="lg:text-sm text-df-text-light">{{ label }}</div>
    <div class="text-df-text font-bold text-lg sm:text-xl"><slot /></div>
  </li>
</template>
