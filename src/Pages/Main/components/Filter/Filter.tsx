import React, { FC, memo, useContext } from 'react';
import cn from 'classnames/bind';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import styles from './Filter.module.scss';
import { IOption } from '../../../Types/types';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { FilterContext } from '../../../../providers/FilterProvider';

const cx = cn.bind(styles);

interface IFilter {
  authors: IOption[];
  locations: IOption[];
}

const Filter: FC<IFilter> = memo(({ authors, locations }) => {
  const { isLightTheme } = useContext(ThemeContext);

  const {
    selectedAuthorID,
    setSelectedAuthorId,
    selectedLocationId,
    setSelectedLocationId,
    paintingName,
    setPaintingName,
    dateValue,
    setDateValue
  } = useContext(FilterContext);

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
        setValue={setSelectedAuthorId}
        defaultValue="Author"
        options={authors}
      />
      <Select
        isLightTheme={isLightTheme}
        value={selectedLocationId}
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
});

export default Filter;
