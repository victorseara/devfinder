<script setup lang="ts">
type Props = {
  label: string;
};

defineProps<Props>();
</script>
<template>
  <li>
    <div class="lg:text-sm text-slate-600">{{ label }}</div>
    <div class="font-bold text-lg sm:text-xl"><slot /></div>
  </li>
</template>
