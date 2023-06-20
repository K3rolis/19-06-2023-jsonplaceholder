export const getLastPage = (data: any) => {
  const totalPages = Math.floor(data?.total / 10);
  if (Math.floor(data?.total % 10) === 1) {
    return totalPages;
  } else return totalPages + 1;
};
