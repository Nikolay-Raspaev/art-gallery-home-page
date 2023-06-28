import React from "react";
import "./Input.css";

const Input = (props) => {
  const { isThemeLight, ...rest } = props;
  return (
    <input
      className={isThemeLight ? "input__name light" : "input__name dark"}
      {...rest}
    />
  );
};

export default Input;
