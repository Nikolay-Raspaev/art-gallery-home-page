import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import logo from '../../../../svg/logo.svg';
import { ReactComponent as Sun } from '../../../../svg/sun.svg';
import styles from './Header.module.scss';
import { useActions } from '../../../../hooks/useActions';

const cx = cn.bind(styles);

interface IHeaderProps {
    className?: string | undefined;
}

const Header: FC<IHeaderProps> = ({ className }) => {
    const { changeTheme } = useActions();
    return (
        <div className={cx('Header', className)}>
            <img src={logo} className={cx('Header__logo')} alt="Framework Team Logo" />
            <Sun className={cx('Header__switch')} onClick={() => changeTheme()} />
        </div>
    );
};

export default memo(Header);
