import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { DateValue } from '../Pages/Main/components/UI/Selects/SelectForInput/SelectForInput';

interface IFilterContext {
  selectedAuthorID: number;
  setSelectedAuthorId: (id: number) => void;
  selectedLocationId: number;
  setSelectedLocationId: (id: number) => void;
  paintingName: string;
  setPaintingName: (id: string) => void;
  dateValue: DateValue;
  setDateValue: (dateValue: DateValue) => void;
}

export const FilterContext = createContext<IFilterContext>({
  selectedAuthorID: 0,
  setSelectedAuthorId: () => {},
  selectedLocationId: 0,
  setSelectedLocationId: () => {},
  paintingName: '',
  setPaintingName: () => {},
  dateValue: { from: '', before: '' },
  setDateValue: () => {}
});

interface IFilterProvider {
  children: ReactNode;
}

export const FilterProvider: React.FC<IFilterProvider> = ({ children }) => {
  const [selectedAuthorID, setSelectedAuthorId] = useState<number>(0);

  const [selectedLocationId, setSelectedLocationId] = useState(0);

  const [paintingName, setPaintingName] = useState('');

  const [dateValue, setDateValue] = useState({ from: '', before: '' });

  const value = useMemo(
    () => ({
      selectedAuthorID,
      setSelectedAuthorId,
      selectedLocationId,
      setSelectedLocationId,
      paintingName,
      setPaintingName,
      dateValue,
      setDateValue
    }),
    [selectedAuthorID, selectedLocationId, paintingName, dateValue]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
