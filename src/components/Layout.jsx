import { useEffect, useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Layout = ({ children }) => {
  const { isThemeLight } = useContext(ThemeContext);

  useEffect(() => {
    saveThemeToLocalStorage(isThemeLight);
  }, [isThemeLight]);

  const saveThemeToLocalStorage = (isLight) => {
    localStorage.setItem("isLight", isLight);
  };

  return <>{children}</>;
};

export default Layout;
