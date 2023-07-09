import React, { useEffect, useRef, useState } from "react";
import s from "./SelectForInput.module.scss";
import { ReactComponent as DownTriangle } from "../../../../../../svg/downTriangle.svg";

const SelectForInput = (props) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const changeValueFrom = (from) => {
    if ((from > 0 && from.length < 5) || !from) {
      props.setValue({ ...props.value, from: from });
    }
  };

  const changeValueBefore = (before) => {
    if ((before > 0 && before.length < 5) || !before) {
      props.setValue({ ...props.value, before: before });
    }
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.container} ref={itemRef}>
      <div
        className={`${s.activation__button} ${
          isActive ? s.button__is__activated : ""
        }
              ${
                props.isThemeLight
                  ? s.activation__button__light
                  : s.activation__button__dark
              }`}
        onClick={() => setIsActive(!isActive)}
      >
        <span>Created</span>
        <div className={s.open}>
          <DownTriangle />
        </div>
      </div>
      {isActive ? (
        <div
          className={`${s.content} ${
            props.isThemeLight ? s.content__light : s.content__dark
          }`}
        >
          <input
            className={`${s.input} ${props.isThemeLight ? s.input__light : ""}`}
            placeholder="from"
            type="number"
            value={props.value.from}
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault();
              }
            }}
            onChange={(event) => changeValueFrom(event.target.value)}
          />
          —
          <input
            className={`${s.input} ${
              props.isThemeLight ? s.input__light : s.input__dark
            }`}
            placeholder="before"
            type="number"
            value={props.value.before}
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault();
              }
            }}
            onChange={(event) => changeValueBefore(event.target.value)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectForInput;
