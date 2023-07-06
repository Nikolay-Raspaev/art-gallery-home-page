import React from "react";
import s from "./Pagination.module.scss";
import {usePagination} from "../../hooks/useMain";
import {ReactComponent as AnglesLeft} from "../../../../svg/anglesLeft.svg";
import {ReactComponent as AngleLeft} from "../../../../svg/angleLeft.svg";

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
            >
                <AnglesLeft/>
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
                <AngleLeft/>
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
                <AngleLeft style={{transform: "rotate(180deg)"}}/>
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
                <AnglesLeft style={{transform: "rotate(180deg)"}}/>
            </button>
        </div>
    );
};

export default Pagination;
