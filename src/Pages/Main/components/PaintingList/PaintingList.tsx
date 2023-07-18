import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingList.module.scss';
import Painting from './Painting/Painting';
import { IViewPainting } from '../../../Types/types';

const cx = cn.bind(styles);

interface IPaintingListProps {
  paintings: IViewPainting[];
  isLoaded: boolean;
}

const PaintingList: FC<IPaintingListProps> = memo(({ paintings, isLoaded }) => (
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
