import { useMemo, createContext, useContext, ReactNode } from "react";

import { useReload, ReloadProvider } from "@src/providers/reload";
import { useLocale } from "@src/providers/app/use-locale";

/** Theme imports */
import { th, getTheme, EThemeMode } from "@src/helpers/theme";
import { useTheme } from "@src/providers/app/use-theme";

const AppContext = createContext<{
  themeMode: EThemeMode;
  isThemeDark: Boolean;
  applyThemeMode: (value: EThemeMode) => void;
  applyThemeColor: (value: string) => void;
  theme: typeof th;
}>({
  themeMode: EThemeMode.Light,
  isThemeDark: false,
  applyThemeMode: (value: EThemeMode) => {},
  applyThemeColor: (value: string) => {},
  theme: th,
});

function AppProvider({ children }: { children: ReactNode }) {
  const reload = useReload();

  /** Recover or set locale */
  useLocale(reload.doReload);

  /** Recover or set theme */
  const [themeMode, applyThemeMode, themeColor, applyThemeColor, isThemeDark] = useTheme(reload.doReload);

  /** Get combined Reactive Native Paper and Navigator theme object */
  const theme = useMemo(() => {
    return getTheme(themeColor.toString(), isThemeDark);
  }, [isThemeDark, themeColor]);

  /** App Context provided object */
  const appContext = useMemo(
    () => ({
      themeMode: themeMode as EThemeMode,
      isThemeDark,
      applyThemeMode,
      applyThemeColor,
      theme,
    }),
    [isThemeDark, themeMode, themeColor, reload]
  );

  return (
    <ReloadProvider>
      <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    </ReloadProvider>
  );
}

function useApp() {
  return useContext(AppContext);
}

export { AppProvider, useApp };
