export const orderBy = <T extends Record<any, any>>(
  inputList: T[],
  orderByField: any,
  sortOrder?: "asc" | "desc",
): T[] => {
  return [...inputList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[orderByField] > b[orderByField] ? 1 : -1;
    } else {
      return a[orderByField] < b[orderByField] ? 1 : -1;
    }
  });
};
