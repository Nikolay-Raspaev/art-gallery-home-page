import { useEffect, useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Layout = ({ children }) => {
  const { isThemeLight } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("isLight", isThemeLight);
  }, [isThemeLight]);

  return <>{children}</>;
};

export default Layout;
