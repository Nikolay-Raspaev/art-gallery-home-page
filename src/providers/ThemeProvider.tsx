import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react';

export const ThemeContext = createContext({
  isLightTheme: true
});

interface IThemeProvider {
  children: ReactNode;
}

export function ThemeProvider({ children }: IThemeProvider) {
  const [isLightTheme, setIsThemeLight] = useState(
    localStorage.getItem('isLight') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isLight', String(isLightTheme));
  }, [isLightTheme]);

  const value = useMemo(
    () => ({
      isLightTheme,
      setIsThemeLight
    }),
    [isLightTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
