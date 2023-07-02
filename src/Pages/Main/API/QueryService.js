import axios from "axios";

export default class QueryService{
    static async getPaintings(host, currentPage, perPage, selectedAuthorID, selectedLocationId, paintingName,dateValue){
        try{
            const url = `${host}/paintings`;
            const params = {
                _page: currentPage,
                _limit: perPage,
                ...(selectedAuthorID && { authorId: selectedAuthorID }),
                ...(selectedLocationId && { anyObjectField: 'locationId', locationId: selectedLocationId }),
                ...(paintingName && { anyObjectField: 'name', name: paintingName }),
                ...(dateValue.from && { created_gte: dateValue.from }),
                ...(dateValue.before && { created_lte: dateValue.before }),
            };
            return await axios.get(url, { params });
        }
        catch(e){
            console.log(e)
        }
    }
}
