import { useMemo, useState } from 'react';

export const useReplaceFieldsIdInPaintings = (
  paintings,
  authors,
  locations
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return useMemo(() => {
    setIsLoaded(false);
    const newPaintings = paintings?.map((painting) => {
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
      return painting;
    });
    setIsLoaded(true);
    return [newPaintings, isLoaded];
  }, [paintings, authors, locations]);
};
