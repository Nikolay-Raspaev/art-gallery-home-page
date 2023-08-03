import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingList.module.scss';
import Painting from './Painting/Painting';
import { IAuthor, ILocation, IPainting } from '../../types/types';

const cx = cn.bind(styles);

interface IPaintingListProps {
  paintings: IPainting[];
  authors: IAuthor[];
  locations: ILocation[];
  loading: boolean;
}

const PaintingList: FC<IPaintingListProps> = memo(
  ({ paintings, authors, locations, loading }) => (
    <div
      className={cx('catalog', {
        paintingsLoaded: !loading
      })}
    >
      {paintings?.map((painting) => {
        const authorName = authors?.find((author) => author.id === painting.authorId)
          ?.name;
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
  )
);

export default PaintingList;
