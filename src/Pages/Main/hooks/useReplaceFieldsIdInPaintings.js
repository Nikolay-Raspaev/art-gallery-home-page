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
    }, [paintings]);
};