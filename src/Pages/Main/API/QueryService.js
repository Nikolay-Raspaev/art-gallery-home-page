import axios from "axios";

export default class QueryService {
  static async getPaintings(
    host,
    currentPage,
    limit,
    selectedAuthorID,
    selectedLocationId,
    paintingName,
    dateValue
  ) {
    const url = `${host}/paintings`;
    const params = {
      _page: currentPage,
      _limit: limit,
      ...(selectedAuthorID && { authorId: selectedAuthorID }),
      ...(selectedLocationId && {
        anyObjectField: "locationId",
        locationId: selectedLocationId,
      }),
      ...(paintingName && { anyObjectField: "name", name: paintingName }),
      ...(dateValue.from && { created_gte: dateValue.from }),
      ...(dateValue.before && { created_lte: dateValue.before }),
    };
    return await axios.get(url, { params });
  }

  static async getLocations(host) {
    return (await axios.get(host + "/locations")).data;
  }

  static async getAuthors(host) {
    return (await axios.get(host + "/authors")).data;
  }
}
