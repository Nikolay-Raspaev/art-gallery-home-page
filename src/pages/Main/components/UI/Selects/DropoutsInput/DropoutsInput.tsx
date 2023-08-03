import React, { FC, memo, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './DropoutsInput.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';
import useOutsideClick from '../../../../hooks/useOutsideClick';

const cx = cn.bind(styles);

interface ISelectForInputProps {
  dateTo: string;
  dateFrom: string;
  setDateTo: (date: string) => void;
  setDateFrom: (date: string) => void;
  isLightTheme: boolean;
}

const DropoutsInput: FC<ISelectForInputProps> = memo(
  ({ dateTo, dateFrom, setDateTo, setDateFrom, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const toggleOpen = () => setIsActive(false);

    useOutsideClick(itemRef, toggleOpen);

    const changeValueFrom = (from: string) => {
      if ((Number(from) > 0 && String(from).length < 5) || !from) {
        setDateFrom(from);
      }
    };

    const changeValueTo = (to: string) => {
      if ((Number(to) > 0 && String(to).length < 5) || !to) {
        setDateTo(to);
      }
    };

    return (
      <div className={cx('DropoutsInput')} ref={itemRef}>
        <div
          className={cx('DropoutsInput__button', {
            'DropoutsInput__button--activated': isActive,
            'DropoutsInput__button--light': isLightTheme,
            'DropoutsInput__button--dark': !isLightTheme
          })}
          onClick={() => setIsActive(!isActive)}
          onKeyDown={() => setIsActive(!isActive)}
        >
          <span>Created</span>
          <div className={cx('DropoutsInput__arrow')}>
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
            className={cx('DropoutsInput__content', {
              'DropoutsInput__content--light': isLightTheme,
              'DropoutsInput__content--dark': !isLightTheme
            })}
          >
            <input
              className={cx('DropoutsInput__input', {
                'DropoutsInput__input--light': isLightTheme
              })}
              placeholder="from"
              type="number"
              value={dateFrom}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(event) => changeValueFrom(event.target.value)}
            />
            —
            <input
              className={cx('DropoutsInput__input', {
                'DropoutsInput__input--light': isLightTheme
              })}
              placeholder="before"
              type="number"
              value={dateTo}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(event) => changeValueTo(event.target.value)}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
);

export default DropoutsInput;
