<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

type Props = {
  icon: string;
  content: string | null;
};

const props = defineProps<Props>();

const NOT_AVAILABLE_CLASSES = 'opacity-50';
const dynamicStyle = computed(() => !props.content && NOT_AVAILABLE_CLASSES);
</script>
<template>
  <li class="flex gap-2 items-center" :class="dynamicStyle">
    <Icon class="text-lg text-slate-500" :icon="icon" />
    <span>{{ content || 'Not available' }}</span>
  </li>
</template>
