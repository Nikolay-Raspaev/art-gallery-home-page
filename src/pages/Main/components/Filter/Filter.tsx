import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import styles from './Filter.module.scss';
import { IAuthor, ILocation } from '../../types/types';
import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';

const cx = cn.bind(styles);

interface IFilter {
  authors: IAuthor[];
  locations: ILocation[];
  paintingName: string;
  dateTo: string;
  dateFrom: string;
  selectedLocationId: number;
  selectedAuthorID: number;
  setPaintingName: (name: string) => void;
  setAuthorId: (authorId: number) => void;
  setLocationId: (locationId: number) => void;
  setDateTo: (dateTo: string) => void;
  setDateFrom: (dateFrom: string) => void;
}

const Filter: FC<IFilter> = memo(
  ({
    authors,
    locations,
    paintingName,
    dateTo,
    dateFrom,
    selectedLocationId,
    selectedAuthorID,
    setPaintingName,
    setAuthorId,
    setLocationId,
    setDateTo,
    setDateFrom
  }) => {
    const { isLightTheme } = useTypedSelector((state) => state.theme);

    const locationsToOption = locations?.map((location) => ({
      id: location.id,
      name: location.location
    }));

    return (
      <div className={cx('filter')}>
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
          setValue={setAuthorId}
          defaultValue="Author"
          options={authors}
        />
        <Select
          isLightTheme={isLightTheme}
          value={selectedLocationId}
          setValue={setLocationId}
          defaultValue="Location"
          options={locationsToOption}
        />
        <SelectForInput
          isLightTheme={isLightTheme}
          dateTo={dateTo}
          dateFrom={dateFrom}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
        />
      </div>
    );
  }
);

export default Filter;
