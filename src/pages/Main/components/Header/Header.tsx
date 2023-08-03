import React, { memo } from 'react';
import cn from 'classnames/bind';
import logo from '../../../../svg/logo.svg';
import { ReactComponent as Sun } from '../../../../svg/sun.svg';
import styles from './Header.module.scss';
import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';
import { useActions } from '../../../../store/hooks/useActions.jsx';

const cx = cn.bind(styles);

const Header = memo(() => {
  const { isLightTheme } = useTypedSelector((state) => state.theme);
  const { setTheme } = useActions();
  return (
    <div className={cx('page__svg')}>
      <img src={logo} className={cx('page__svg__logo')} alt="Framework Team Logo" />
      <Sun
        className={cx('page__svg__switch', 'svg')}
        onClick={() => setTheme(!isLightTheme)}
      />
    </div>
  );
});

export default Header;
