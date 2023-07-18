import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

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
      className={cx('input__name', {
        light: isLightTheme,
        dark: !isLightTheme
      })}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  )
);

export default Input;
