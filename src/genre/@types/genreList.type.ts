import { Genre } from '@prisma/client';
import { pagination } from 'src/@types';

export type genreList = {
  data: Genre[];
  meta: pagination;
};
