import { Author } from '@prisma/client';
import { pagination } from '../../@types';

export type AuthorList = {
  data: Author[];
  meta: pagination;
};
