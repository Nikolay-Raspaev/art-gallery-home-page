import React, {useEffect, useRef, useState} from "react";
import s from "./SelectForInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectForInput = ({ isThemeLight, value, setValue }) => {

    const itemRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (itemRef.current && !itemRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
    }, []);

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.container} ref={itemRef}>
      <div
        className={`${s.activation__button} ${
          isActive ? s.button__is__activated : ""
        }
              ${
                isThemeLight
                  ? s.activation__button__light
                  : s.activation__button__dark
              }`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={s.button__text}>Created</div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${s.open} ${isThemeLight ? s.open__light : s.open__dark}`}
        />
      </div>
      {isActive ? (
        <div
          className={`${s.content} ${
            isThemeLight ? s.content__light : s.content__dark
          }`}
        >
          <input
            className={`${s.input} ${
              isThemeLight ? s.input__light : s.input__dark
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
            className={`${s.input} ${
              isThemeLight ? s.input__light : s.input__dark
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
