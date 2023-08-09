import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingList.module.scss';
import Painting from './Painting/Painting';
import { IAuthor, ILocation, IPainting } from '../../types/interfaces';

const cx = cn.bind(styles);

interface IPaintingListProps {
  className: string;
  paintings: IPainting[];
  authors: IAuthor[];
  locations: ILocation[];
  loading: boolean;
}

const PaintingList: FC<IPaintingListProps> = ({
  className,
  paintings,
  authors,
  locations,
  loading
}) => (
  <div
    className={cx('PaintingList', className, {
      'PaintingList--loaded': !loading
    })}
  >
    {paintings?.map((painting) => {
      const authorName = authors?.find((author) => author.id === painting.authorId)?.name;
      const locationName = locations?.find(
        (location) => location.id === painting.locationId
      )?.location;
      return (
        <Painting
          key={painting.id}
          painting={painting}
          authorName={authorName!}
          locationName={locationName!}
        />
      );
    })}
  </div>
);

export default memo(PaintingList);
