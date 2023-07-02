import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import s from "./Pagination.module.scss";
import {usePagination} from "../../hooks/useMain";

const Pagination = (props) => {
    const paginationPages = usePagination(props.totalPages, props.currentPage);
  return (
    <div className={s.pagination}>
      <button
        className={`${s.pagination__angel} ${s.double__left} ${
          props.isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(1);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} rotation={180} />
      </button>
      <button
        className={`${s.pagination__angel} ${
          props.isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage - 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} rotation={180} />
      </button>
      {paginationPages?.map((page) => (
        <button
          className={`${s.pagination__page} ${
            props.isThemeLight ? s.pagination__page__light : s.pagination__page__dark
          }`}
          disabled={page === props.currentPage}
          key={page}
          onClick={() => {
            props.setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={`${s.pagination__angel} ${
          props.isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage + 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className={`${s.pagination__angel} ${s.double__right} ${
          props.isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.totalPages);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;
