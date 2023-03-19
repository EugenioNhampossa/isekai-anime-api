import { Studio } from '@prisma/client';
import { pagination } from 'src/@types';

export type StudioList = {
  data: Studio[];
  meta: pagination;
};
