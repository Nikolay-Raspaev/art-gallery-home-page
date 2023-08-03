import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Pagination.module.scss';
import { ReactComponent as AnglesLeft } from '../../../../svg/anglesLeft.svg';
import { ReactComponent as AngleLeft } from '../../../../svg/angleLeft.svg';
import { usePagination } from '../../hooks/usePagination';
import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';

const cx = cn.bind(styles);

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = memo(
  ({ totalPages, currentPage, setCurrentPage }) => {
    const { isLightTheme } = useTypedSelector((state) => state.theme);

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
