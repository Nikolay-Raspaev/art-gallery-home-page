import React, { useState } from "react";
import "./SelectForInput.css";
import "../WorkerSelect/Select2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectForInput = ({ value, setValue }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="select__container">
      <div
        className={`select_for_input_button ${isActive ? "active" : ""}`}
        onClick={(e) => setIsActive(!isActive)}
      >
        Created
        <FontAwesomeIcon icon={faCaretDown} className="dropdown__open" />
      </div>
      {isActive ? (
        <div className="dropdown__input__content">
          <input
            className="select__input"
            type="number"
            value={value.from}
            onChange={(event) =>
              setValue({ ...value, from: event.target.value })
            }
          />
          —
          <input
            className="select__input"
            type="number"
            value={value.to}
            onChange={(event) => setValue({ ...value, to: event.target.value })}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectForInput;
