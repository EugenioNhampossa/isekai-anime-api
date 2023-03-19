import { Genre } from '@prisma/client';
import { pagination } from 'src/@types';

export type GenreList = {
  data: Genre[];
  meta: pagination;
};
