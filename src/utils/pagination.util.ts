import { createPaginator } from 'prisma-pagination';

const paginante = createPaginator({
  page: 1,
  perPage: 20,
});

export { paginante };
