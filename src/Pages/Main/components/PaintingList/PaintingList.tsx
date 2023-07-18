import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingList.module.scss';
import Painting, { IPainting } from './Painting/Painting';

const cx = cn.bind(styles);

interface IId {
  id: number;
}

export interface IPaintingProps extends IPainting, IId {}

interface IPaintingList {
  paintings: IPaintingProps[];
  isLoaded: boolean;
}

const PaintingList: FC<IPaintingList> = memo(({ paintings, isLoaded }) => (
  <div
    className={cx('catalog', {
      paintingsLoaded: isLoaded
    })}
  >
    {paintings.map((painting) => (
      <Painting painting={painting} key={painting.id} />
    ))}
  </div>
));

export default PaintingList;
