import { Genre } from '@prisma/client';
import { pagination } from '../../@types';

export type GenreList = {
  data: Genre[];
  meta: pagination;
};
