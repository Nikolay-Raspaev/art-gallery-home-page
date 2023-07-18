import { useMemo, useState } from 'react';
import {
  IAuthor,
  ILocation,
  IPainting,
  IViewPainting
} from '../../Types/types';

export const useReplaceFieldsIdInPaintings = (
  paintings: IPainting[],
  authors: IAuthor[],
  locations: ILocation[]
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return useMemo((): [IViewPainting[], boolean] => {
    setIsLoaded(false);
    const newPaintings: IViewPainting[] = paintings?.map((painting) => {
      const currentAuthor = authors.find(
        (author) => author.id === painting.authorId
      );
      const currentLocation = locations.find(
        (location) => location.id === painting.locationId
      );
      if (currentLocation && currentAuthor) {
        return {
          location: currentLocation.location,
          author: currentAuthor.name,
          ...painting
        };
      }
      return {
        author: '',
        location: '',
        ...painting
      };
    });
    setIsLoaded(true);
    return [newPaintings, isLoaded];
  }, [paintings, authors, locations]);
};
