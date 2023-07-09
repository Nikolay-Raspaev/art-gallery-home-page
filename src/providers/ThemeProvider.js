import { createContext, useState, useEffect, useMemo } from "react";

export const ThemeContext = createContext({ isThemeLight: true });

export const ThemeProvider = ({ children }) => {
  const [isThemeLight, setIsThemeLight] = useState(
    localStorage.getItem("isLight") === "true"
  );

  const value = useMemo(
    () => ({ isThemeLight, setIsThemeLight }),
    [isThemeLight]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
