import { Author } from '@prisma/client';
import { pagination } from 'src/@types';

export type AuthorList = {
  data: Author[];
  meta: pagination;
};
