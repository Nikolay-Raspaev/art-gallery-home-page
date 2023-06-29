import React, { useState } from "react";
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

  return (
    <div className={s.dropdown}>
      <div
        className={`${s.dropdown_btn} ${isActive ? s.active : ""} ${
          isThemeLight && isActive ? s.active__light : ""
        }
        ${!isThemeLight && isActive ? s.active__dark : ""}
        ${isThemeLight ? s.dropdown__btn__light : s.dropdown__btn__dark}`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={s.dropdown_btn__container}>
          {selected ? selected : defaultValue}
        </div>
        <div className={s.icon}>
          {value ? (
            <FontAwesomeIcon
              icon={faXmark}
              className={
                isThemeLight
                  ? s.dropdown__close__light
                  : s.dropdown__close__dark
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
            className={`${s.dropdown__open} ${
              isThemeLight ? s.dropdown__open__light : s.dropdown__open__dark
            }`}
          />
        </div>
      </div>
      {isActive && (
        <div
          className={`${s.dropdown_content} ${
            isThemeLight
              ? s.dropdown__content__light
              : s.dropdown__content__dark
          }`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`${s.dropdown_item} ${
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
                className={s.dropdown_item__pointer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
