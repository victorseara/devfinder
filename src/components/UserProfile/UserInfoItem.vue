<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

type Props = {
  icon: string;
  content: string | null;
  href?: string | null;
};

const props = defineProps<Props>();
const isLink = computed(() => Boolean(props.href));

const dynamicStyle = computed(() => {
  if (!props.content) return 'opacity-50';
  if (isLink.value)
    return 'ease-in-out transition-colors hover:text-df-blue hover:underline underline-offset-4';

  return '';
});
</script>
<template>
  <li class="flex gap-2 text-sm" :class="dynamicStyle">
    <Icon class="flex-shrink-0 text-xl" :icon="icon" />
    <component class="overflow-clip text-ellipsis" :is="isLink ? 'a' : 'span'" :href="href">
      {{ content || 'Not available' }}
    </component>
  </li>
</template>
