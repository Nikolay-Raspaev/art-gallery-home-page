import { limit } from '../../Consts';

export const getPageCount = (totalCount: number) =>
  Math.ceil(totalCount / limit);
