import React, { FC, memo } from 'react';
import s from './PaintingList.module.scss';
import Painting, { IPainting } from './Painting/Painting';

interface IId {
  id: number;
}

interface IPaintingList {
  paintings: (IPainting & IId)[];
  isLoaded: boolean;
}

const PaintingList: FC<IPaintingList> = memo(({ paintings, isLoaded }) => (
  <div className={`${s.catalog} ${isLoaded ? s.paintingsLoaded : ''}`}>
    {paintings.map((painting) => (
      <Painting painting={painting} key={painting.id} />
    ))}
  </div>
));

export default PaintingList;
