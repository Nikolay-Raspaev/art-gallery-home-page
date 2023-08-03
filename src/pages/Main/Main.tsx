import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Main.module.scss';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useActions } from '../../store/hooks/useActions.jsx';

const cx = cn.bind(styles);

const Main = () => {
  const { isLightTheme } = useTypedSelector((state) => state.theme);
  const { authors } = useTypedSelector((state) => state.author);
  const { locations } = useTypedSelector((state) => state.location);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paintingName, setPaintingName] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [locationId, setLocationId] = useState(0);
  const [authorId, setAuthorId] = useState(0);
  const { paintings, loading, error } = useTypedSelector((state) => state.painting);
  const { fetchAuthors, fetchLocations, fetchPaintings } = useActions();

  useEffect(() => {
    fetchAuthors();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchPaintings(
      {
        _page: currentPage,
        authorId,
        locationId,
        created_gte: dateFrom,
        created_lte: dateTo,
        name: paintingName
      },
      setTotalPages
    );
  }, [currentPage, authorId, locationId, dateFrom, dateTo, paintingName]);

  useEffect(() => {
    setCurrentPage(1);
  }, [authorId, locationId, paintingName, dateFrom, dateTo]);

  return (
    <div
      className={cx('page', {
        page__light: isLightTheme,
        page__dark: !isLightTheme
      })}
    >
      <Header />
      <Filter
        authors={authors}
        locations={locations}
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
        <div>{error}</div>
      ) : (
        <PaintingList
          paintings={paintings}
          authors={authors}
          locations={locations}
          loading={loading}
        />
      )}
      {paintings.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Main;
