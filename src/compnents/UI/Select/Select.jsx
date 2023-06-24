import React from "react";
import "./Select.css";

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    // <div className="select">
    //   <select
    //     className="main__page__select"
    //     value={value}
    //     onChange={(event) => onChange(event.target.value)}
    //   >
    //     <option value="" selected hidden>
    //       2rq2r3
    //     </option>
    //     <option value="">{defaultValue}</option>
    //     {options?.map((option) => (
    //       <option key={option.id} value={option.id}>
    //         {option.name ? option.name : option.location}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    <div className="select">
      <select
        name="format"
        id="mySelect"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={value ? "current" : "b"}
      >
        <option value="" hidden>
          2rq2r3
        </option>
        <option value="">{defaultValue}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name ? option.name : option.location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
