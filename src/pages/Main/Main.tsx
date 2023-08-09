import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Main.module.scss';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import { paintingAPI } from '../../store/API/PaintingService';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';

const cx = cn.bind(styles);

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paintingName, setPaintingName] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [locationId, setLocationId] = useState(0);
    const [authorId, setAuthorId] = useState(0);
    const { data: authors } = paintingAPI.useGetAuthorsQuery(null);
    const { data: locations } = paintingAPI.useGetLocationsQuery(null);
    const {
        data: paintingsData,
        error,
        isLoading
    } = paintingAPI.useGetPaintingsQuery({
        _page: currentPage,
        authorId,
        locationId,
        created_gte: dateFrom,
        created_lte: dateTo,
        name: paintingName
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [authorId, locationId, paintingName, dateFrom, dateTo]);

    return (
        <div className={cx('Main')}>
            <Header className={styles.Main__Header} />
            <Filter
                className={styles.Main__Filter}
                authors={authors!}
                locations={locations!}
                paintingName={paintingName}
                dateTo={dateTo}
                dateFrom={dateFrom}
                selectedLocationId={locationId}
                selectedAuthorID={authorId}
                setPaintingName={setPaintingName}
                setAuthorId={setAuthorId}
                setLocationId={setLocationId}
                setDateTo={setDateTo}
                setDateFrom={setDateFrom}
            />
            {error ? (
                <div>Произошла ошибка при загрузке</div>
            ) : (
                <PaintingList
                    className={styles.Main__PaintingList}
                    paintings={paintingsData?.paintings!}
                    authors={authors!}
                    locations={locations!}
                    loading={isLoading}
                />
            )}
            {paintingsData?.paintings?.length !== 0 && (
                <Pagination
                    className={styles.Main__Pagination}
                    currentPage={currentPage}
                    totalPages={paintingsData?.totalPages!}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
};

export default Main;
