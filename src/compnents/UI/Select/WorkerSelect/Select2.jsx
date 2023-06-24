import React, { useState } from "react";
import "./Select2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select2 = ({ options, defaultValue, selectedName, value, setValue }) => {
  const [isActive, setIsActive] = useState(false);

  const [selected, setSelected] = useState("");

  return (
    <div className="dropdown">
      <div
        className={`dropdown-btn ${isActive ? "active" : ""}`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className="dropdown-btn__container">
          {selected ? selected : defaultValue}
        </div>
        <div className="icon">
          {value ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="dropdown-close"
              onClick={(e) => {
                setSelected("");
                setValue(0);
              }}
            />
          ) : (
            ""
          )}

          <FontAwesomeIcon icon={faCaretDown} className="dropdown__open" />
        </div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option.id}
              className="dropdown-item"
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
