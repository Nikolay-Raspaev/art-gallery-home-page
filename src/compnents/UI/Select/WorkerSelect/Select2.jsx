import React, { useState } from "react";
import "./Select2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select2 = ({
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
    <div className="dropdown">
      <div
        className={`dropdown-btn ${isActive ? "active" : ""} ${
          isThemeLight && isActive ? "active__light" : ""
        }
        ${!isThemeLight && isActive ? "active__dark" : ""}
        ${isThemeLight ? "dropdown__btn__light" : "dropdown__btn__dark"}`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className="dropdown-btn__container">
          {selected ? selected : defaultValue}
        </div>
        <div className="icon">
          {value ? (
            <FontAwesomeIcon
              icon={faXmark}
              className={
                isThemeLight
                  ? "dropdown__close__light"
                  : "dropdown__close__dark"
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
            className={
              isThemeLight
                ? "dropdown__open dropdown__open__light"
                : "dropdown__open dropdown__open__dark"
            }
          />
        </div>
      </div>
      {isActive && (
        <div
          className={
            isThemeLight
              ? "dropdown-content dropdown__content__light"
              : "dropdown-content dropdown__content__dark"
          }
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={
                isThemeLight
                  ? "dropdown-item item__light"
                  : "dropdown-item item__dark"
              }
              onClick={(e) => {
                setValue(option.id);
                setSelected(option[selectedName]);
                setIsActive(false);
              }}
            >
              {option[selectedName]}
              <FontAwesomeIcon
                icon={faHandPointer}
                className="dropdown-item__pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select2;
