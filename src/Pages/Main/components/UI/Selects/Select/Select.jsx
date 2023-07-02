import React, { useEffect, useRef, useState } from "react";
import s from "./Select.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select = (props) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, []);

  const [isActive, setIsActive] = useState(false);

  const [selected, setSelected] = useState("");

  return (
    <div className={s.dropdown} ref={itemRef}>
      <div
        className={`${s.dropdown__button} ${isActive ? s.button__active : ""} ${
          props.isThemeLight && isActive ? s.button__active__light : ""
        }
        ${!props.isThemeLight && isActive ? s.button__active__dark : ""}
        ${props.isThemeLight ? s.button__light : s.button__dark}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={s.button__text}>
          {selected ? selected : props.defaultValue}
        </div>
        <div className={s.button__icon}>
          {props.value ? (
            <FontAwesomeIcon
              icon={faXmark}
              className={
                props.isThemeLight ? s.button__close__light : s.button__close__dark
              }
              onClick={() => {
                setSelected("");
                props.setValue(0);
              }}
            />
          ) : (
            ""
          )}

          <FontAwesomeIcon
            icon={faCaretDown}
            className={`${s.button__open} ${
                props.isThemeLight ? s.button__open__light : s.button__open__dark
            }`}
          />
        </div>
      </div>
      {isActive && (
        <div className={`${s.container}`}>
          <div
            className={`${s.content__dividing_line} ${
                props.isThemeLight ? s.dividing_line__light : s.dividing_line__dark
            }`}
          ></div>
          <div
            className={`${s.content} ${
                props.isThemeLight ? s.content__light : s.content__dark
            }`}
          >
            {props.options.map((option) => (
              <div
                key={option.id}
                className={`${s.item} ${
                  props.isThemeLight ? s.item__light : s.item__dark
                }`}
                onClick={() => {
                  props.setValue(option.id);
                  setSelected(option[props.selectedName]);
                }}
              >
                <span>{option[props.selectedName]}</span>
                <FontAwesomeIcon
                  icon={faHandPointer}
                  className={s.item__pointer}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
