import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import logo from '../../../../svg/logo.svg';
import { ReactComponent as Sun } from '../../../../svg/sun.svg';
import styles from './Header.module.scss';
import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';
import { useActions } from '../../../../store/hooks/useActions.jsx';

const cx = cn.bind(styles);

interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = memo(({ className }) => {
  const { isLightTheme } = useTypedSelector((state) => state.theme);
  const { setIsThemeLight } = useActions();
  return (
    <div className={cx('Header', className)}>
      <img src={logo} className={cx('Header__logo')} alt="Framework Team Logo" />
      <Sun
        className={cx('Header__switch')}
        onClick={() => setIsThemeLight(!isLightTheme)}
      />
    </div>
  );
});

export default Header;
