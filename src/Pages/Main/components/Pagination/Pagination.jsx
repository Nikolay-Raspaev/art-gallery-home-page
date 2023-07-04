import React from "react";
import s from "./Pagination.module.scss";
import { usePagination } from "../../hooks/useMain";
import {ReactComponent as FaAnglesLeft} from "../../../../svg/faAnglesLeft.svg";
import {ReactComponent as FaAngleLeft} from "../../../../svg/faAngleLeft.svg";

const Pagination = (props) => {
  const paginationPages = usePagination(props.totalPages, props.currentPage);
  return (
    <div className={s.pagination}>
      <button
        className={`${s.pagination__angel} ${s.double__left} ${
          props.isThemeLight
            ? s.pagination__page__light
            : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(1);
        }}
      ><FaAnglesLeft/>
      </button>
      <button
        className={`${s.pagination__angel} ${
          props.isThemeLight
            ? s.pagination__page__light
            : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage - 1);
        }}
      >
        <FaAngleLeft/>
      </button>
      {paginationPages?.map((page) => (
        <button
          className={`${s.pagination__page} ${
            props.isThemeLight
              ? s.pagination__page__light
              : s.pagination__page__dark
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
          props.isThemeLight
            ? s.pagination__page__light
            : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage + 1);
        }}
      >
          <FaAngleLeft style={{transform: "rotate(180deg)"}}/>
      </button>
      <button
        className={`${s.pagination__angel} ${s.double__right} ${
          props.isThemeLight
            ? s.pagination__page__light
            : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.totalPages);
        }}
      >
          <FaAnglesLeft style={{transform: "rotate(180deg)"}}/>
      </button>
    </div>
  );
};

export default Pagination;
