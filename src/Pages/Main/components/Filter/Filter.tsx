import React, { FC, memo, useEffect, useState } from 'react';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import s from './Filter.module.scss';
import { useFetching } from '../../hooks/useFetching';
import QueryService from '../../API/QueryService';
import { AxiosResponse } from 'axios';
import { IAxiosPainting } from '../../API/Interface';

interface IFilter {
  currentPage: number;
  afterFetch: (response: AxiosResponse<IAxiosPainting[], any>) => void;
  changePage: (value: number) => void;
  authors: [];
  locations: [];
}

const Filter: FC<IFilter> = memo(
  ({ currentPage, afterFetch, changePage, authors, locations }) => {
    const [selectedAuthorID, setSelectedAuthorId] = useState(0);

    const [selectedLocationId, setSelectedLocationId] = useState(0);

    const [paintingName, setPaintingName] = useState('');

    const [dateValue, setDateValue] = useState({ from: '', before: '' });

    const [fetchPaintings, paintingError] = useFetching(async () => {
      const response = await QueryService.getPaintings({
        currentPage: currentPage,
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
          placeholder="Name"
          maxLength={45}
          value={paintingName}
          setValue={setPaintingName}
        />
        <Select
          value={selectedAuthorID}
          selectedName="name"
          setValue={setSelectedAuthorId}
          defaultValue="Author"
          options={authors}
        />
        <Select
          value={selectedLocationId}
          selectedName="location"
          setValue={setSelectedLocationId}
          defaultValue="Location"
          options={locations}
        />
        <SelectForInput value={dateValue} setValue={setDateValue} />
      </div>
    );
  }
);

export default Filter;
