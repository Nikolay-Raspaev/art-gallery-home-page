import React, { FC, memo, useContext } from 'react';
import s from './Pagination.module.scss';
import { ReactComponent as AnglesLeft } from '../../../../svg/anglesLeft.svg';
import { ReactComponent as AngleLeft } from '../../../../svg/angleLeft.svg';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { usePagination } from '../../hooks/usePagination';

interface IPagination {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<IPagination> = memo(
  ({ totalPages, currentPage, setCurrentPage }) => {
    const { isLightTheme } = useContext(ThemeContext);

    const paginationPages = usePagination(totalPages, currentPage);

    return (
      <div className={s.pagination}>
        <button
          type="button"
          className={`${s.pagination__angel} ${s.double__left} ${
            isLightTheme ? s.pagination__page__light : s.pagination__page__dark
          }`}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          <AnglesLeft />
        </button>
        <button
          type="button"
          className={`${s.pagination__angel} ${
            isLightTheme ? s.pagination__page__light : s.pagination__page__dark
          }`}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          <AngleLeft />
        </button>
        {paginationPages.map((page) => (
          <button
            type="button"
            className={`${s.pagination__page} ${
              isLightTheme
                ? s.pagination__page__light
                : s.pagination__page__dark
            }`}
            disabled={page === currentPage}
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className={`${s.pagination__angel} ${
            isLightTheme ? s.pagination__page__light : s.pagination__page__dark
          }`}
          disabled={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <AngleLeft style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          type="button"
          className={`${s.pagination__angel} ${s.double__right} ${
            isLightTheme ? s.pagination__page__light : s.pagination__page__dark
          }`}
          disabled={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages);
          }}
        >
          <AnglesLeft style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    );
  }
);

export default Pagination;
