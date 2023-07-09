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
    var url = `?_page=${currentPage}&_limit=${limit}${
        selectedAuthorID ? `&authorId=${selectedAuthorID}` : ""
    }${
        selectedLocationId
            ? `&anyObjectField=locationId&locationId=${selectedLocationId}`
            : ""
    }${paintingName ? `&anyObjectField=name&name=${paintingName}` : ""}${
        dateValue.from ? `&created_gte=${dateValue.from}` : ""
    }${dateValue.before ? `&created_lte=${dateValue.before}` : ""}`;
    window.history.pushState({}, "", `/art-gallery-home-page${url.toString()}`);
    return await axios.get(`${host}/paintings${url}`);
  }

  static async getLocations(host) {
    return (await axios.get(host + "/locations")).data;
  }

  static async getAuthors(host) {
    return (await axios.get(host + "/authors")).data;
  }
}
