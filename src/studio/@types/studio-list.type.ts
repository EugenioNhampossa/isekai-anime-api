import { Studio } from '@prisma/client';
import { pagination } from '../../@types';

export type StudioList = {
  data: Studio[];
  meta: pagination;
};
