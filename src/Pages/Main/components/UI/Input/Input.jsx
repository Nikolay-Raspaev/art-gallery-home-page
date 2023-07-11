import React, { memo, useContext } from "react";
import s from "./Input.module.scss";
import { ThemeContext } from "../../../../../providers/ThemeProvider";

const Input = memo((props) => {
  const { isThemeLight } = useContext(ThemeContext);
  return (
    <input
      className={`${s.input__name} ${isThemeLight ? s.light : s.dark}`}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
    />
  );
});

export default Input;
