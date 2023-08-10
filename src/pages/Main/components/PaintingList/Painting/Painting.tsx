import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Painting.module.scss';
import { IPainting } from '../../../../../types/interfaces';

const cx = cn.bind(styles);

interface IPaintingProps {
    painting: IPainting;
    authorName: string;
    locationName: string;
}

const Painting: FC<IPaintingProps> = ({ painting, authorName, locationName }) => (
    <div className={cx('Painting')}>
        <div
            className={cx('Painting__img')}
            style={{
                backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${painting.imageUrl})`
            }}
        />
        <div className={cx('Painting__overlay')}>
            <h1 className={cx('Painting__name')}>{painting.name}</h1>
            <p className={cx('Painting__overlay-paragraph')}>
                <span className={cx('Painting__overlay-span')}>Author: </span>
                {authorName}
            </p>
            <p className={cx('Painting__overlay-paragraph')}>
                <span className={cx('Painting__overlay-span')}>Created: </span>
                {painting.created}
            </p>
            <p className={cx('Painting__overlay-paragraph')}>
                <span className={cx('Painting__overlay-span')}>Location: </span>
                {locationName}
            </p>
        </div>
    </div>
);

export default memo(Painting);
