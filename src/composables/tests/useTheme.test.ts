import { createApp, type App } from 'vue';
import { PREFERED_COLOR_SCHEME_MEDIA, THEMES, useTheme } from '../useTheme';

const setupMatchMediaMock = (query: string, matches = true) => ({
  matches,
  media: query,
  addEventListener: vi.fn(),
  onchange: vi.fn(),
  dispatchEvent: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
});

function withComposableSetup<T, U>(
  composable: (args?: U) => T,
  args?: U
): [T | null, App<Element>] {
  let result: T | null = null;

  const app = createApp({
    setup() {
      result = composable(args);
      return () => {};
    },
  });

  app.mount(document.createElement('div'));

  return [result, app];
}

describe('Test useTheme', () => {
  test('Starts with Dark Theme when its the user prefered color scheme', () => {
    const spyMatchMedia = vi
      .spyOn(window, 'matchMedia')
      .mockImplementationOnce(setupMatchMediaMock);

    const [result, app] = withComposableSetup(useTheme);

    expect(spyMatchMedia).toHaveBeenCalledWith(PREFERED_COLOR_SCHEME_MEDIA);
    expect(result?.theme.value).toEqual(THEMES.DARK);

    app.unmount();
  });

  test('Starts with Light Theme when its the user prefered color scheme', async () => {
    const spyMatchMedia = vi
      .spyOn(window, 'matchMedia')
      .mockImplementationOnce((query) => setupMatchMediaMock(query, false));

    const [result, app] = withComposableSetup(useTheme);

    expect(spyMatchMedia).toHaveBeenCalledWith(PREFERED_COLOR_SCHEME_MEDIA);
    expect(result?.theme.value).toEqual(THEMES.LIGHT);

    app.unmount();
  });

  test('User can toggle theme', async () => {
    const spyMatchMedia = vi
      .spyOn(window, 'matchMedia')
      .mockImplementationOnce((query) => setupMatchMediaMock(query, false));

    const [result, app] = withComposableSetup(useTheme);

    expect(spyMatchMedia).toHaveBeenCalledWith(PREFERED_COLOR_SCHEME_MEDIA);
    expect(result?.theme.value).toEqual(THEMES.LIGHT);

    result?.onToggleTheme();
    expect(result?.theme.value).toEqual(THEMES.DARK);

    result?.onToggleTheme();
    expect(result?.theme.value).toEqual(THEMES.LIGHT);

    app.unmount();
  });
});
