import axios from 'axios';
import { host, limit } from '../Consts';

export default class QueryService {
	static async getPaintings(incomingParams) {
		const url = `${host}/paintings`;
		const params = {
			_page: incomingParams.currentPage,
			_limit: limit,
			...(incomingParams.selectedAuthorID && { authorId: incomingParams.selectedAuthorID }),
			...(incomingParams.selectedLocationId && {
				anyObjectField: 'locationId',
				locationId: incomingParams.selectedLocationId
			}),
			...(incomingParams.paintingName && { anyObjectField: 'name', name: incomingParams.paintingName }),
			...(incomingParams.dateValue?.from && { created_gte: incomingParams.dateValue?.from }),
			...(incomingParams.dateValue?.before && { created_lte: incomingParams.dateValue?.before })
		};
		return await axios.get(url, { params });
	}

	static async getLocations(host) {
		return (await axios.get(host + '/locations')).data;
	}

	static async getAuthors(host) {
		return (await axios.get(host + '/authors')).data;
	}
}
