import React, { useContext } from "react";
import s from "./Input.module.scss";
import { ThemeContext } from "../../../../../providers/ThemeProvider";

const Input = (props) => {
  const { isThemeLight } = useContext(ThemeContext);
  return (
    <input
      className={`${s.input__name} ${isThemeLight ? s.light : s.dark}`}
      {...props}
    />
  );
};

export default Input;
