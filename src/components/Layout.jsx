import {useContext, useEffect} from "react";
import {ThemeContext} from "../providers/ThemeProvider";

const Layout = ({ children }) => {
  const { isLightTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("isLight", isLightTheme);
  }, [isLightTheme]);

  return <>{children}</>;
};

export default Layout;
