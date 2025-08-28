export interface GetPagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T;
}

export interface GetPagedBody<T> {
  pageNumber: number;
  pageSize: number;
  filter: T;
  orderByValue: OrderByValue[];
}

export interface OrderByValue {
  colId: string;
  sort: Sort;
}

type Sort = 'asc' | 'desc';
