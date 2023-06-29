import React from "react";
import "./Pagination.css";

const Input = (pages, setCurrentPage) => {
  return (
    <div>
      {pages?.map((page, index) => (
        <div
          key={page}
          onClick={(e) => {
            setCurrentPage(page);
          }}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Input;
