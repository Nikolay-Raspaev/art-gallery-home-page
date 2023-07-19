import React, { FC, memo, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './SelectForInput.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';
import { DateValue } from '../../../../Types/types';
import useOutsideClick from '../../../../hooks/useOutsideClick';

const cx = cn.bind(styles);

interface ISelectForInputProps {
  value: DateValue;
  setValue: (DateValue: DateValue) => void;
  isLightTheme: boolean;
}

const SelectForInput: FC<ISelectForInputProps> = memo(
  ({ value, setValue, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const toggleOpen = () => setIsActive(false);

    useOutsideClick(itemRef, toggleOpen);

    const changeValueFrom = (from: string) => {
      if ((Number(from) > 0 && String(from).length < 5) || !from) {
        setValue({
          ...value,
          from
        });
      }
    };

    const changeValueBefore = (before: string) => {
      if ((Number(before) > 0 && String(before).length < 5) || !before) {
        setValue({
          ...value,
          before
        });
      }
    };

    return (
      <div className={cx('container')} ref={itemRef}>
        <div
          role="button"
          tabIndex={0}
          className={cx('activation__button', {
            button__is__activated: isActive,
            activation__button__light: isLightTheme,
            activation__button__dark: !isLightTheme
          })}
          onClick={() => setIsActive(!isActive)}
          onKeyDown={() => setIsActive(!isActive)}
        >
          <span>Created</span>
          <div className={cx('open')}>
            {isActive ? (
              <DownTriangle
                style={{
                  transform: 'rotate(180deg)'
                }}
              />
            ) : (
              <DownTriangle />
            )}
          </div>
        </div>
        {isActive ? (
          <div
            className={cx('content', {
              content__light: isLightTheme,
              content__dark: !isLightTheme
            })}
          >
            <input
              className={cx('input', {
                input__light: isLightTheme
              })}
              placeholder="from"
              type="number"
              value={value.from}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(event) => changeValueFrom(event.target.value)}
            />
            —
            <input
              className={cx('input', {
                input__light: isLightTheme,
                input__dark: !isLightTheme
              })}
              placeholder="before"
              type="number"
              value={value.before}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(event) => changeValueBefore(event.target.value)}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
);

export default SelectForInput;
