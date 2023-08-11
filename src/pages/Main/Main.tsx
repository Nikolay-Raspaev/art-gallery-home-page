import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Main.module.scss';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import { useGetAuthorsQuery } from '../../store/Api/author.paintingApi';
import { useGetLocationsQuery } from '../../store/Api/location.paintingApi';
import { useGetPaintingsQuery } from '../../store/Api/paintingApi';
import { LIMIT } from '../../constants';

const cx = cn.bind(styles);

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paintingName, setPaintingName] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [locationId, setLocationId] = useState(0);
    const [authorId, setAuthorId] = useState(0);
    const { data: authors } = useGetAuthorsQuery(null);
    const { data: locations } = useGetLocationsQuery(null);
    const {
        data: paintingsData,
        error,
        isFetching
    } = useGetPaintingsQuery({
        _page: currentPage,
        authorId,
        locationId,
        created_gte: dateFrom,
        created_lte: dateTo,
        name: paintingName,
        _limit: LIMIT
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
                    loading={isFetching}
                />
            )}
            {paintingsData?.paintings && paintingsData?.paintings.length !== 0 && (
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
