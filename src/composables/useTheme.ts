import { onMounted, ref, watch } from 'vue';

export const THEMES = {
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

export const PREFERED_COLOR_SCHEME_MEDIA = '(prefers-color-scheme: dark)';

export const useTheme = () => {
  const initialTheme = window.matchMedia(PREFERED_COLOR_SCHEME_MEDIA).matches
    ? THEMES.DARK
    : THEMES.LIGHT;

  const currentTheme = ref(initialTheme);

  const onToggleTheme = () => {
    currentTheme.value = currentTheme.value.name === 'Dark' ? THEMES.LIGHT : THEMES.DARK;
  };

  watch(
    () => currentTheme.value.class,
    (newValue: string, oldValue: string) => {
      document.body.classList.replace(oldValue, newValue);
    }
  );

  onMounted(() => {
    document.body.classList.add(currentTheme.value.class);
  });

  return { theme: currentTheme, onToggleTheme };
};
