import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import logo from '../../../../svg/logo.svg';
import { ReactComponent as Sun } from '../../../../svg/sun.svg';
import styles from './Header.module.scss';
import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';
import { themeSlice } from '../../../../store/reducers/themeReducer';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch';

const cx = cn.bind(styles);

interface IHeaderProps {
  className: string | undefined;
}

const Header: FC<IHeaderProps> = ({ className }) => {
  const { changeTheme } = themeSlice.actions;
  const { isLightTheme } = useTypedSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  return (
    <div className={cx('Header', className)}>
      <img src={logo} className={cx('Header__logo')} alt="Framework Team Logo" />
      <Sun
        className={cx('Header__switch')}
        onClick={() => dispatch(changeTheme(!isLightTheme))}
      />
    </div>
  );
};

export default memo(Header);
