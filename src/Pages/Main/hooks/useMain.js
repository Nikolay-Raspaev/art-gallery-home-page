import { useMemo } from "react";

export const useReplaceFieldsIdInPaintings = (
  paintings,
  authors,
  locations
) => {
  const newPaintings = useMemo(() => {
    return paintings?.map((painting) => {
      const author = authors.find((author) => author.id === painting.authorId);
      const location = locations.find(
        (location) => location.id === painting.locationId
      );
      if (location && author) {
        return {
          location: location.location,
          author: author.name,

          ...painting,
        };
      }
      return painting;
    });
  }, [paintings, authors, locations]);
  return newPaintings;
};

export const useCreatePaginationPages = (countPages, currentPage) => {
  const paginationPages = useMemo(() => {
    const pageArray = [];
    if (countPages > 3) {
      if (currentPage > 2) {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageArray.push(i);
          if (i === countPages) break;
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pageArray.push(i);
          if (i === countPages) break;
        }
      }
    } else {
      for (let i = 1; i <= countPages; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }, [countPages, currentPage]);
  return paginationPages;
};
