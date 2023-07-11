import React, {memo, useContext, useEffect, useRef, useState} from "react";
import s from "./Select.module.scss";
import { ReactComponent as DownTriangle } from "../../../../../../svg/downTriangle.svg";
import { ReactComponent as Pointer } from "../../../../../../svg/pointer.svg";
import { ReactComponent as Cross } from "../../../../../../svg/cross.svg";
import { ThemeContext } from "../../../../../../providers/ThemeProvider";

const Select = memo((props) => {
  const { isThemeLight } = useContext(ThemeContext);

  const itemRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return function cleanup() {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const scrollTimeoutRef = useRef(null);

  const selectRef = useRef(null);

  const scrollUp = () => {
    selectRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMouseUp = () => {
    clearInterval(scrollTimeoutRef.current);
  };

  const assignFunction = () => {
    scrollTimeoutRef.current = setInterval(scrollDown, 2);
  };

  const scrollDown = () => {
    selectRef.current.scrollBy(0, 1);
  };

  const handleMouseDown = () => {
    isScrollerAtBottom ? scrollUp() : assignFunction();
  };

  const [isScrollerAtBottom, setIsScrollerAtBottom] = useState(false);
  const scrollerAtBottom = () => {
    const scrollTop = selectRef.current.scrollTop;
    const scrollHeight = selectRef.current.scrollHeight;
    const clientHeight = selectRef.current.clientHeight;
    scrollHeight <= clientHeight + scrollTop
      ? setIsScrollerAtBottom(true)
      : setIsScrollerAtBottom(false);
  };

  return (
    <div className={s.dropdown} ref={itemRef}>
      <div
        className={`${s.dropdown__button} ${isActive ? s.button__active : ""} ${
          isThemeLight ? s.button__light : s.button__dark
        }`}
        onClick={() => {
          setIsActive(!isActive);
          setIsScrollerAtBottom(false);
        }}
      >
        <span className={s.button__text}>
          {selected ? selected : props.defaultValue}
        </span>
        <div className={s.button__icon}>
          {props.value ? (
            <div
              className={s.button__close}
              onClick={() => {
                setSelected("");
                props.setValue(0);
              }}
            >
              <Cross />
            </div>
          ) : (
            ""
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
                <DownTriangle style={{ transform: "rotate(180deg)" }} />
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
            isThemeLight ? s.container__light : s.container__dark
          }`}
        >
          <div
            className={`${s.container__dividing_line} ${
              isThemeLight ? s.dividing_line__light : s.dividing_line__dark
            }`}
          />
          <div
            ref={selectRef}
            onScroll={scrollerAtBottom}
            className={s.content}
          >
            {props.options.map((option) => (
              <div
                key={option.id}
                className={`${s.item} ${
                  isThemeLight ? s.item__light : s.item__dark
                }`}
                onClick={() => {
                  props.setValue(option.id);
                  setSelected(option[props.selectedName]);
                }}
              >
                <span>{option[props.selectedName]}</span>
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
});

export default Select;
