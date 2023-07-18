import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react';

interface IThemeContext {
  isLightTheme: boolean;
  setIsThemeLight: (theme: boolean) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  isLightTheme: true,
  setIsThemeLight: () => {}
});

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
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
};
