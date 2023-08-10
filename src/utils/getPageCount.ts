import { LIMIT } from '../constants';

export const getPageCount = (totalCount: number): number => Math.ceil(totalCount / LIMIT);
