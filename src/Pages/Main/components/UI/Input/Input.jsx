import React from "react";
import s from "./Input.module.scss";

const Input = (props) => {
  const { isThemeLight, ...rest } = props;
  return (
    <input
      className={`${s.input__name} ${isThemeLight ? s.light : s.dark}`}
      {...rest}
    />
  );
};

export default Input;
