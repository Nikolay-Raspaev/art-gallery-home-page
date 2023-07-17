import React, {
  FC,
  memo,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import s from './Select.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';
import { ReactComponent as Pointer } from '../../../../../../svg/pointer.svg';
import { ReactComponent as Cross } from '../../../../../../svg/cross.svg';
import { ThemeContext } from '../../../../../../providers/ThemeProvider';

type TOption = {
  id: number;
  name: string;
};

interface ISelectProps {
  defaultValue: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  options: TOption[];
  selectedName: string;
}

const Select: FC<ISelectProps> = memo(
  ({ defaultValue, value, setValue, options, selectedName }) => {
    const { isLightTheme } = useContext(ThemeContext);

    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const [selected, setSelected] = useState<string>('');

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          itemRef.current &&
          !itemRef.current.contains(event.target as Node)
        ) {
          setIsActive(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return function cleanup() {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

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
      <div className={s.dropdown} ref={itemRef}>
        <div
          className={`${s.dropdown__button} ${
            isActive ? s.button__active : ''
          } ${isLightTheme ? s.button__light : s.button__dark}`}
          onClick={() => {
            setIsActive(!isActive);
            setIsScrollerAtBottom(false);
          }}
        >
          <span className={s.button__text}>{selected || defaultValue}</span>
          <div className={s.button__icon}>
            {value ? (
              <div
                className={s.button__close}
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
                className={s.button__open}
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
              <div className={s.button__open}>
                <DownTriangle />
              </div>
            )}
          </div>
        </div>
        {isActive && (
          <div
            className={`${s.container} ${
              isLightTheme ? s.container__light : s.container__dark
            }`}
          >
            <div
              className={`${s.container__dividing_line} ${
                isLightTheme ? s.dividing_line__light : s.dividing_line__dark
              }`}
            />
            <div
              ref={selectRef}
              onScroll={scrollerAtBottom}
              className={s.content}
            >
              {options.map((option) => (
                <div
                  key={option.id} 
                  className={`${s.item} ${
                    isLightTheme ? s.item__light : s.item__dark
                  }`}
                  onClick={() => {
                    setValue(option.id);
                    setSelected(
                      String(option[selectedName as keyof typeof option])
                    );
                  }}
                >
                  <span>{option[selectedName as keyof typeof option]}</span>
                  <div className={s.item__pointer}>
                    <Pointer />
                  </div>
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
