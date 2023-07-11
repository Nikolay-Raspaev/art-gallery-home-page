import React, {memo, useContext} from 'react';
import logo from "../../../../svg/logo.svg";
import { ReactComponent as Sun } from "../../../../svg/sun.svg";
import s from "./Header.module.scss";
import {ThemeContext} from "../../../../providers/ThemeProvider";
const Header = memo(() => {
    const {setIsThemeLight } = useContext(ThemeContext);
    return (
        <div className={s.page__svg}>
            <img src={logo} className={s.page__svg__logo} alt="Framework Team Logo" />
            <Sun
                className={`${s.page__svg__switch} ${s.svg}`}
                onClick={() => setIsThemeLight(theme => !theme)}
            />
        </div>
    );
});

export default Header; 