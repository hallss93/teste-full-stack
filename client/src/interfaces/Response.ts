export interface IPaginationUsers<U> {
  users: {
    rows: U;
    count: number;
  };
}

export default interface ResponseAPI<T> {
  status: number;
  data: T;
}
