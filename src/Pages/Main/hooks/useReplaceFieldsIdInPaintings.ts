import { useMemo, useState } from 'react';
import { IAuthor, IAxiosPainting, ILocation } from '../API/Interface';
import { IPaintingProps } from '../components/PaintingList/PaintingList';

export const useReplaceFieldsIdInPaintings = (
  paintings: IAxiosPainting[],
  authors: IAuthor[],
  locations: ILocation[]
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return useMemo((): [IPaintingProps[], boolean] => {
    setIsLoaded(false);
    const newPaintings: IPaintingProps[] = paintings?.map((painting) => {
      const currentAuthor = authors.find(
        (author) => author.id === painting.authorId
      );
      const currentLocation = locations.find(
        (location) => location.id === painting.locationId
      );
      if (currentLocation && currentAuthor) {
        return {
          imageUrl: painting.imgUrl,
          location: currentLocation.location,
          author: currentAuthor.name,
          ...painting
        };
      }
      return {
        imageUrl: painting.imgUrl,
        author: '',
        location: '',
        ...painting
      };
    });
    setIsLoaded(true);
    return [newPaintings, isLoaded];
  }, [paintings, authors, locations]);
};
