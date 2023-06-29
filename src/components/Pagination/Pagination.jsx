import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  isThemeLight,
  currentPage,
  setCurrentPage,
  pages,
  maxPage,
}) => {
  return (
    <div className="pagination">
      <button
        className={`pagination__angel double__left ${
          isThemeLight ? "pagination__page_light" : "pagination__page_dark"
        }`}
        disabled={1 === currentPage}
        onClick={(e) => {
          setCurrentPage(1);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} rotation={180} />
      </button>
      <button
        className={`pagination__angel ${
          isThemeLight ? "pagination__page_light" : "pagination__page_dark"
        }`}
        disabled={1 === currentPage}
        onClick={(e) => {
          setCurrentPage(currentPage - 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} rotation={180} />
      </button>
      {pages?.map((page, index) => (
        <button
          className={`pagination__page ${
            isThemeLight ? "pagination__page_light" : "pagination__page_dark"
          }`}
          disabled={page === currentPage}
          key={page}
          onClick={(e) => {
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={`pagination__angel ${
          isThemeLight ? "pagination__page_light" : "pagination__page_dark"
        }`}
        disabled={maxPage === currentPage}
        onClick={(e) => {
          setCurrentPage(currentPage + 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className={`pagination__angel double__right ${
          isThemeLight ? "pagination__page_light" : "pagination__page_dark"
        }`}
        disabled={maxPage === currentPage}
        onClick={(e) => {
          setCurrentPage(maxPage);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;
