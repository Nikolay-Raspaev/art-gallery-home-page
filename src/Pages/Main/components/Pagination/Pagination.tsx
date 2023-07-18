import React, { FC, memo, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './Pagination.module.scss';
import { ReactComponent as AnglesLeft } from '../../../../svg/anglesLeft.svg';
import { ReactComponent as AngleLeft } from '../../../../svg/angleLeft.svg';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { usePagination } from '../../hooks/usePagination';

const cx = cn.bind(styles);

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
      <div className={cx('pagination')}>
        <button
          type="button"
          className={cx('pagination__angel', 'double__left', {
            pagination__page__light: isLightTheme,
            pagination__page__dark: !isLightTheme
          })}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          <AnglesLeft />
        </button>
        <button
          type="button"
          className={cx('pagination__angel', {
            pagination__page__light: isLightTheme,
            pagination__page__dark: !isLightTheme
          })}
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
            className={cx('pagination__page', {
              pagination__page__light: isLightTheme,
              pagination__page__dark: !isLightTheme
            })}
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
          className={cx('pagination__angel', {
            pagination__page__light: isLightTheme,
            pagination__page__dark: !isLightTheme
          })}
          disabled={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <AngleLeft style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          type="button"
          className={cx('pagination__angel', 'double__right', {
            pagination__page__light: isLightTheme,
            pagination__page__dark: !isLightTheme
          })}
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
