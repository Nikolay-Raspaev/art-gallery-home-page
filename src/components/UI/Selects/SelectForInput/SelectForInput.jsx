import React, { useState } from "react";
import s from "./SelectForInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectForInput = ({ isThemeLight, value, setValue }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.select__container}>
      <div
        className={`${s.select_for_input_button} ${
          isActive ? s.input_active : ""
        }
              ${
                isThemeLight
                  ? s.select_for_input_button__light
                  : s.select_for_input_button__dark
              }`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={s.btn__text}>Created</div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${s.dropdown__open} ${
            isThemeLight ? s.dropdown__open__light : s.dropdown__open__dark
          }`}
        />
      </div>
      {isActive ? (
        <div
          className={`${s.dropdown__input__content} ${
            isThemeLight
              ? s.dropdown__input__content__light
              : s.dropdown__input__content__dark
          }`}
        >
          <input
            className={`${s.select__input} ${
              isThemeLight ? s.select__input__light : s.select__input__dark
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
            className={`${s.select__input} ${
              isThemeLight ? s.select__input__light : s.select__input__dark
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
