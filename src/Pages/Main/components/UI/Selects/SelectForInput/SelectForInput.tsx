import React, { FC, memo, useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './SelectForInput.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';

const cx = cn.bind(styles);

export type DateValue = {
  before: string;
  from: string;
};

interface ISelectForInputProps {
  value: DateValue;
  setValue: (DateValue: DateValue) => void;
  isLightTheme: boolean;
}

const SelectForInput: FC<ISelectForInputProps> = memo(
  ({ value, setValue, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          itemRef.current &&
          !itemRef.current.contains(event.target as Node)
        ) {
          setIsActive(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return function cleanup() {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

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
            <DownTriangle />
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
