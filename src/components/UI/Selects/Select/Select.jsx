import React, { useEffect, useState } from "react";
import s from "./Select.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select = ({
  isThemeLight,
  options,
  defaultValue,
  selectedName,
  value,
  setValue,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const option = options.find((option) => option.id === parseInt(value));
    if (option) {
      setSelected(option[selectedName]);
    }
  }, [options]);

  //console.log(findOption(options));

  return (
    <div className={s.dropdown}>
      <div
        className={`${s.dropdown__button} ${isActive ? s.button__active : ""} ${
          isThemeLight && isActive ? s.button__active__light : ""
        }
        ${!isThemeLight && isActive ? s.button__active__dark : ""}
        ${isThemeLight ? s.button__light : s.button__dark}`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={s.button__text}>
          {selected ? selected : defaultValue}
        </div>
        <div className={s.button__icon}>
          {value ? (
            <FontAwesomeIcon
              icon={faXmark}
              className={
                isThemeLight ? s.button__close__light : s.button__close__dark
              }
              onClick={(e) => {
                setSelected("");
                setValue(0);
              }}
            />
          ) : (
            ""
          )}

          <FontAwesomeIcon
            icon={faCaretDown}
            className={`${s.button__open} ${
              isThemeLight ? s.button__open__light : s.button__open__dark
            }`}
          />
        </div>
      </div>
      {isActive && (
        <div
          className={`${s.content} ${
            isThemeLight ? s.content__light : s.content__dark
          }`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`${s.item} ${
                isThemeLight ? s.item__light : s.item__dark
              }`}
              onClick={(e) => {
                setValue(option.id);
                setSelected(option[selectedName]);
                setIsActive(false);
              }}
            >
              <span>{option[selectedName]}</span>
              <FontAwesomeIcon
                icon={faHandPointer}
                className={s.item__pointer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
