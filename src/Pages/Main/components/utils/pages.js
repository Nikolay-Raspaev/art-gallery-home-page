import { limit } from '../../Consts';

export const getPageCount = (totalCount) => Math.ceil(totalCount / limit);
