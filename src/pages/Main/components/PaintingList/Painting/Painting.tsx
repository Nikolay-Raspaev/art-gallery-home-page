import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './Painting.module.scss';
import { IPainting } from '../../../types/types';

const cx = cn.bind(styles);

interface IPaintingProps {
  painting: IPainting;
  authorName: string;
  locationName: string;
}

const Painting: FC<IPaintingProps> = ({ painting, authorName, locationName }) => (
  <div className={cx('catalog__painting')}>
    <div
      className={cx('catalog__painting__img')}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${painting.imageUrl})`
      }}
    />
    <div className={cx('catalog__painting__overlay')}>
      <h1 className={cx('painting__name')}>{painting.name}</h1>
      <p>
        <span>Author:</span>
        {authorName}
      </p>
      <p>
        <span>Created:</span>
        {painting.created}
      </p>
      <p>
        <span>Location:</span>
        {locationName}
      </p>
    </div>
  </div>
);

export default Painting;
