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
			const author = authors.find((author) => author.id === painting.authorId);
			const location = locations.find(
				(location) => location.id === painting.locationId
			);
			if (location && author) {
				return {
					location: location.location,
					author: author.name,
					...painting
				};
			}
			return painting;
		});
		setIsLoaded(true);
		return [newPaintings, isLoaded];
	}, [paintings, authors, locations]);
};
