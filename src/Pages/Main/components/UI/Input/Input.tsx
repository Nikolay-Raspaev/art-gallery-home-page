import React, { FC, memo } from 'react';
import s from './Input.module.scss';

interface IInput {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxLength: number;
  isLightTheme: boolean;
}

const Input: FC<IInput> = memo(
  ({ value, setValue, placeholder, maxLength, isLightTheme }) => (
    <input
      className={`${s.input__name} ${isLightTheme ? s.light : s.dark}`}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  )
);

export default Input;
