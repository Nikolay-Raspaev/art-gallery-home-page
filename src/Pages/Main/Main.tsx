import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosHeaders, AxiosResponse } from 'axios';
import s from './Main.module.scss';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import { useReplaceFieldsIdInPaintings } from './hooks/useReplaceFieldsIdInPaintings';
import QueryService from './API/QueryService';
import { getPageCount } from './components/utils/pages';
import { ThemeContext } from '../../providers/ThemeProvider';
import Header from './components/Header/Header';
import { IAuthor, IAxiosPainting, ILocation } from './API/Interface';

const Main = () => {
  const { isLightTheme } = useContext(ThemeContext);

  const [paintings, setPaintings] = useState<IAxiosPainting[]>([]);

  const [authors, setAuthors] = useState<IAuthor[]>([]);

  const [locations, setLocations] = useState<ILocation[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [newPaintings, isLoaded] = useReplaceFieldsIdInPaintings(
    paintings,
    authors,
    locations
  );

  useEffect(() => {
    QueryService.getAuthors().then((axiosAuthors) => setAuthors(axiosAuthors));
    QueryService.getLocations().then((axiosLocations) =>
      setLocations(axiosLocations)
    );
  }, []);

  const afterFetch = useCallback(
    (response: AxiosResponse<IAxiosPainting[], any>) => {
      setPaintings(response.data);
      const headers = response.headers as AxiosHeaders;
      if (headers) {
        const totalCount = Number(headers.get('x-total-count'));
        setTotalPages(getPageCount(totalCount));
      }
    },
    []
  );

  const changePage = useCallback((value: number) => {
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
