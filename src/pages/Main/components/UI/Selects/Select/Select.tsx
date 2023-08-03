import React, { FC, memo, useCallback, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Select.module.scss';
import { ReactComponent as Cross } from '../../../../../../svg/cross.svg';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import SelectTriange from './SelectTriange/SelectTriange';

const cx = cn.bind(styles);

export interface IOption {
  id: number;
  name: string;
}

interface ISelectProps {
  defaultValue: string;
  value: number;
  setValue: (value: number) => void;
  options: IOption[];
  isLightTheme: boolean;
}

const Select: FC<ISelectProps> = memo(
  ({ defaultValue, value, setValue, options, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const [selected, setSelected] = useState<string>('');

    const selectRef = useRef<HTMLDivElement>(null);

    const [isScrollerAtBottom, setIsScrollerAtBottom] = useState(false);

    const toggleOpen = useCallback(() => {
      setIsActive(false);
    }, []);

    useOutsideClick(itemRef, toggleOpen);

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
            <SelectTriange
              isActive={isActive}
              className={styles.button__open}
              selectRef={selectRef}
              isScrollerAtBottom={isScrollerAtBottom}
            />
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
            <div ref={selectRef} onScroll={scrollerAtBottom} className={cx('content')}>
              {options.map((option) => (
                <div
                  key={option.id}
                  className={cx('item', {
                    item__light: isLightTheme,
                    item__dark: !isLightTheme
                  })}
                  onClick={() => {
                    setValue(option.id);
                    setSelected(option.name);
                  }}
                >
                  <span>{option.name}</span>
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
