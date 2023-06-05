import { computed, ref, watch } from 'vue';

const THEMES = {
  LIGHT: {
    class: 'light-mode',
    name: 'Light',
    icon: 'iconamoon:mode-light-fill',
  },
  DARK: {
    class: 'dark-mode',
    name: 'Dark',
    icon: 'iconamoon:mode-dark-fill',
  },
} as const;

export const useTheme = () => {
  const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;

  const currentTheme = ref(initialTheme);

  const isDarkModeEnabled = computed(() => currentTheme.value.name === 'Dark');

  const onToggleTheme = () => {
    currentTheme.value = isDarkModeEnabled.value ? THEMES.LIGHT : THEMES.DARK;
  };

  const displayButton = computed(() => (isDarkModeEnabled.value ? THEMES.LIGHT : THEMES.DARK));

  watch(
    () => currentTheme.value.class,
    (newValue, oldValue) => {
      const body = document.querySelector('body');
      body?.classList.replace(oldValue, newValue);
    }
  );

  return { theme: currentTheme, onToggleTheme, displayButton };
};
