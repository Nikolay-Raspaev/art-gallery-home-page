import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext({ isLight: true });

const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(true);

  const value = useMemo(() => ({ isLight, setIsLight }), [isLight]);

  function loadThemeFromLocalStorage() {
    const storedIsLight = localStorage.getItem("isLight");
    setIsLight(storedIsLight === "true");
  }

  useEffect(() => {
    loadThemeFromLocalStorage();
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
