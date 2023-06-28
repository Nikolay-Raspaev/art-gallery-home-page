import React from "react";
import useTheme from "../../../hooks/useTheme";

const Layout = ({ children }) => {
  const { isLight } = useTheme();

  return (
    <div className={`layaout ${isLight ? "light" : "dark"}`}>
      {children}
      {isLight}
    </div>
  );
};

export default Layout;
