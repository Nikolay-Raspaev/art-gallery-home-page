import React, { FC } from 'react';
import s from './Painting.module.scss';
import { host } from '../../../Consts';

export interface IPainting {
  imageUrl: string;
  name: string;
  author: string;
  created: string;
  location: string;
}

interface IPaintingProps {
  painting: IPainting;
}

const Painting: FC<IPaintingProps> = ({ painting }) => (
  <div className={s.catalog__painting}>
    <div
      className={s.catalog__painting__img}
      style={{
        backgroundImage: `url(${host}${painting.imageUrl})`
      }}
    />
    <div className={s.catalog__painting__overlay}>
      <p className={s.painting__name}>{painting.name}</p>
      <div className={s.painting__field}>
        <p>
          <span>Author:</span>
          {painting.author}
        </p>
        <p>
          <span>Created:</span>
          {painting.created}
        </p>
        <p>
          <span>Location:</span>
          {painting.location}
        </p>
      </div>
    </div>
  </div>
);

export default Painting;
