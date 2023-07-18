import React, { FC, memo, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Select.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';
import { ReactComponent as Cross } from '../../../../../../svg/cross.svg';
import { IAuthor, ILocation } from '../../../../../Types/types';
import useOutsideClick from '../../../../hooks/useOutsideClick';

const cx = cn.bind(styles);

interface ISelectProps {
  defaultValue: string;
  value: number;
  setValue: (value: number) => void;
  options: (IAuthor | ILocation)[];
  selectedName: string;
  isLightTheme: boolean;
}

const Select: FC<ISelectProps> = memo(
  ({ defaultValue, value, setValue, options, selectedName, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const [selected, setSelected] = useState<string>('');

    const toggleOpen = () => setIsActive(false);

    useOutsideClick(itemRef, toggleOpen);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const selectRef = useRef<HTMLDivElement>(null);

    const scrollUp = () => {
      selectRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const handleMouseUp = () => {
      clearInterval(scrollTimeoutRef.current as NodeJS.Timeout);
    };

    const scrollDown = () => {
      selectRef.current?.scrollBy(0, 1);
    };

    const assignFunction = () => {
      scrollTimeoutRef.current = setInterval(scrollDown, 2) as NodeJS.Timeout;
    };

    const [isScrollerAtBottom, setIsScrollerAtBottom] = useState(false);

    const handleMouseDown = () => {
      isScrollerAtBottom ? scrollUp() : assignFunction();
    };

    const scrollerAtBottom = () => {
      const scrollTop = selectRef.current?.scrollTop;
      const scrollHeight = selectRef.current?.scrollHeight;
      const clientHeight = selectRef.current?.clientHeight;
      if (scrollHeight && clientHeight && scrollTop) {
        scrollHeight <= clientHeight + scrollTop
          ? setIsScrollerAtBottom(true)
          : setIsScrollerAtBottom(false);
      }
    };

    return (
      <div className={cx('dropdown')} ref={itemRef}>
        <div
          className={cx('dropdown__button', {
            button__active: isActive,
            button__light: isLightTheme,
            button__dark: !isLightTheme
          })}
          onClick={() => {
            setIsActive(!isActive);
            setIsScrollerAtBottom(false);
          }}
        >
          <span className={cx('button__text')}>{selected || defaultValue}</span>
          <div className={cx('button__icon')}>
            {value ? (
              <div
                className={cx('button__close')}
                onClick={() => {
                  setSelected('');
                  setValue(0);
                }}
              >
                <Cross />
              </div>
            ) : (
              ''
            )}
            {isActive ? (
              <div
                className={cx('button__open')}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {isScrollerAtBottom ? (
                  <DownTriangle
                    style={{
                      transform: 'rotate(180deg)'
                    }}
                  />
                ) : (
                  <DownTriangle />
                )}
              </div>
            ) : (
              <div className={cx('button__open')}>
                <DownTriangle />
              </div>
            )}
          </div>
        </div>
        {isActive && (
          <div
            className={cx('container', {
              container__light: isLightTheme,
              container__dark: !isLightTheme
            })}
          >
            <div
              className={cx('container__dividing_line', {
                dividing_line__light: isLightTheme,
                dividing_line__dark: !isLightTheme
              })}
            />
            <div
              ref={selectRef}
              onScroll={scrollerAtBottom}
              className={cx('content')}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  className={cx('item', {
                    item__light: isLightTheme,
                    item__dark: !isLightTheme
                  })}
                  onClick={() => {
                    setValue(option.id);
                    setSelected(
                      String(option[selectedName as keyof typeof option])
                    );
                  }}
                >
                  <span>{option[selectedName as keyof typeof option]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Select;
