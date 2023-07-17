import React, { useCallback, useContext, useEffect, useState } from 'react';
import s from './Main.module.scss';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import { useReplaceFieldsIdInPaintings } from './hooks/useReplaceFieldsIdInPaintings';
import QueryService from './API/QueryService';
import { getPageCount } from './components/utils/pages';
import { ThemeContext } from '../../providers/ThemeProvider';
import { host, limit } from './Consts';
import Header from './components/Header/Header';
import { AxiosResponse } from 'axios';
import { IAxiosPainting } from './API/Interface';

const Main = () => {
  const { isLightTheme } = useContext(ThemeContext);

  const [paintings, setPaintings] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [locations, setLocations] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [newPaintings, isLoaded] = useReplaceFieldsIdInPaintings(
    paintings,
    authors,
    locations
  );

  useEffect(() => {
    getAuthors().then((authors) => setAuthors(authors));
    getLocations().then((locations) => setLocations(locations));
  }, []);

  const afterFetch = useCallback(
    (response: AxiosResponse<IAxiosPainting[], any>) => {
      setPaintings(response.data);
      const totalCount = response.headers.get('x-total-count');
      setTotalPages(getPageCount(totalCount, limit));
    },
    []
  );

  const getAuthors = async () => {
    return await QueryService.getAuthors(host);
  };

  const getLocations = async () => {
    return await QueryService.getLocations(host);
  };

  const changePage = useCallback((value) => {
    setCurrentPage(value);
  }, []);

  return (
    <div className={`${s.page} ${isLightTheme ? s.page__light : s.page__dark}`}>
      <Header />
      <Filter
        changePage={changePage}
        afterFetch={afterFetch}
        currentPage={currentPage}
        authors={authors}
        locations={locations}
      />
      <PaintingList paintings={newPaintings} isLoaded={isLoaded} />
      {newPaintings.length !== 0 && (
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
