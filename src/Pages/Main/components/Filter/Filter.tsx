import React, { FC, memo, useContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import s from './Filter.module.scss';
import { useFetching } from '../../hooks/useFetching';
import QueryService from '../../API/QueryService';
import { IAuthor, IAxiosPainting, ILocation } from '../../API/Interface';
import { ThemeContext } from '../../../../providers/ThemeProvider';

interface IFilter {
  currentPage: number;
  afterFetch: (response: AxiosResponse<IAxiosPainting[], any>) => void;
  changePage: (value: number) => void;
  authors: IAuthor[];
  locations: ILocation[];
}

const Filter: FC<IFilter> = memo(
  ({ currentPage, afterFetch, changePage, authors, locations }) => {
    const { isLightTheme } = useContext(ThemeContext);

    const [selectedAuthorID, setSelectedAuthorId] = useState(0);

    const [selectedLocationId, setSelectedLocationId] = useState(0);

    const [paintingName, setPaintingName] = useState('');

    const [dateValue, setDateValue] = useState({ from: '', before: '' });

    const [fetchPaintings, paintingError] = useFetching(async () => {
      const response = await QueryService.getPaintings({
        currentPage,
        selectedAuthorID,
        selectedLocationId,
        paintingName,
        dateValue
      });
      afterFetch(response);
    });

    useEffect(() => {
      fetchPaintings();
    }, [
      currentPage,
      selectedAuthorID,
      selectedLocationId,
      dateValue,
      paintingName
    ]);

    useEffect(() => {
      changePage(1);
    }, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

    if (paintingError) {
      return <div>{paintingError}</div>;
    }

    return (
      <div className={s.filter}>
        {paintingError}
        <Input
          isLightTheme={isLightTheme}
          placeholder="Name"
          maxLength={45}
          value={paintingName}
          setValue={setPaintingName}
        />
        <Select
          isLightTheme={isLightTheme}
          value={selectedAuthorID}
          selectedName="name"
          setValue={setSelectedAuthorId}
          defaultValue="Author"
          options={authors}
        />
        <Select
          isLightTheme={isLightTheme}
          value={selectedLocationId}
          selectedName="location"
          setValue={setSelectedLocationId}
          defaultValue="Location"
          options={locations}
        />
        <SelectForInput
          isLightTheme={isLightTheme}
          value={dateValue}
          setValue={setDateValue}
        />
      </div>
    );
  }
);

export default Filter;
