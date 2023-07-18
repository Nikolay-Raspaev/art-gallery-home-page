import React, { FC } from 'react';
import s from './Painting.module.scss';

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
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${painting.imageUrl})`
      }}
    />
    <div className={s.catalog__painting__overlay}>
      <h1 className={s.painting__name}>{painting.name}</h1>
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
);

export default Painting;
