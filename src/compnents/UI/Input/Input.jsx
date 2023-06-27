import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <input
      className={props.isThemeLight ? "input__name light" : "input__name dark"}
      {...props}
    />
  );
};

export default Input;
