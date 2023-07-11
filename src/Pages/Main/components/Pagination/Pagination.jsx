import React, {memo, useContext} from "react";
import s from "./Pagination.module.scss";
import { ReactComponent as AnglesLeft } from "../../../../svg/anglesLeft.svg";
import { ReactComponent as AngleLeft } from "../../../../svg/angleLeft.svg";
import { ThemeContext } from "../../../../providers/ThemeProvider";
import {usePagination} from "../../hooks/usePagination";

const Pagination = memo((props) => {
  const { isThemeLight } = useContext(ThemeContext);

  const paginationPages = usePagination(props.totalPages, props.currentPage);
  return (
    <div className={s.pagination}>
      <button
        className={`${s.pagination__angel} ${s.double__left} ${
          isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(1);
        }}
      >
        <AnglesLeft />
      </button>
      <button
        className={`${s.pagination__angel} ${
          isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={1 === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage - 1);
        }}
      >
        <AngleLeft />
      </button>
      {paginationPages?.map((page) => (
        <button
          className={`${s.pagination__page} ${
            isThemeLight ? s.pagination__page__light : s.pagination__page__dark
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
          isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.currentPage + 1);
        }}
      >
        <AngleLeft style={{ transform: "rotate(180deg)" }} />
      </button>
      <button
        className={`${s.pagination__angel} ${s.double__right} ${
          isThemeLight ? s.pagination__page__light : s.pagination__page__dark
        }`}
        disabled={props.totalPages === props.currentPage}
        onClick={() => {
          props.setCurrentPage(props.totalPages);
        }}
      >
        <AnglesLeft style={{ transform: "rotate(180deg)" }} />
      </button>
    </div>
  );
});

export default Pagination;
