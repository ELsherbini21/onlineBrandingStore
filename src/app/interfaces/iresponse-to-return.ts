export interface IResponseToReturn<T> {
  results: number;
  metadata: Imetadata;
  Data: Set<T>;
}

export interface Imetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
