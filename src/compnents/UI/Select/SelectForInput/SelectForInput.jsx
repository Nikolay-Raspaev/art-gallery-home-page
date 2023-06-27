import React, { useState } from "react";
import "./SelectForInput.css";
import "../WorkerSelect/Select2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectForInput = ({ isThemeLight, value, setValue }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="select__container">
      <div
        className={`select_for_input_button ${isActive ? "active" : ""} ${
          isThemeLight && isActive ? "active__light" : ""
        }
              ${!isThemeLight && isActive ? "active__dark" : ""}
              ${
                isThemeLight
                  ? "select_for_input_button__light"
                  : "select_for_input_button__dark"
              }`}
        onClick={(e) => setIsActive(!isActive)}
      >
        Created
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`dropdown__open ${
            isThemeLight ? "dropdown__open__light" : "dropdown__open__dark"
          }`}
        />
      </div>
      {isActive ? (
        <div
          className={`dropdown__input__content ${
            isThemeLight
              ? "dropdown__input__content__light"
              : "dropdown__input__content__dark"
          }`}
        >
          <input
            className={`select__input ${
              isThemeLight ? "select__input__light" : "select__input__dark"
            }`}
            placeholder="from"
            type="number"
            value={value.from}
            onChange={(event) =>
              setValue({ ...value, from: event.target.value })
            }
          />
          —
          <input
            className={`select__input ${
              isThemeLight ? "select__input__light" : "select__input__dark"
            }`}
            placeholder="before"
            type="number"
            value={value.before}
            onChange={(event) =>
              setValue({ ...value, before: event.target.value })
            }
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectForInput;
