import React, { FC, memo, useContext } from 'react';
import s from './Input.module.scss';
import { ThemeContext } from '../../../../../providers/ThemeProvider';

interface IInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  maxLength: number;
}

const Input: FC<IInput> = memo(
  ({ value, setValue, placeholder, maxLength }) => {
    const { isLightTheme } = useContext(ThemeContext);
    return (
      <input
        className={`${s.input__name} ${isLightTheme ? s.light : s.dark}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    );
  },
);

export default Input;
