export const parsePaging = (query) => {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const size = Math.min(Math.max(parseInt(query.size || '20', 10), 1), 100);
  return { skip: (page - 1) * size, take: size, page, size };
};
