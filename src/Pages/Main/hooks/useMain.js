import {useMemo} from "react";

export const useReplaceFieldsIdInPaintings = (
  paintings,
  authors,
  locations
) => {
  return useMemo(() => {
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
};

export const usePagination = (totalPages, currentPage) => {
  return useMemo(() => {
    const pageArray = [];
    if (totalPages > 3) {
      if (currentPage > 2) {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageArray.push(i);
          if (i === totalPages) break;
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pageArray.push(i);
          if (i === totalPages) break;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }, [totalPages, currentPage]);
};