import { Request } from "./requests";

export interface Item<TId extends string | number> {
  id: TId;
}

type DataState<TData> = [TData] extends [never]
  ? never
  : {
      data: TData;
    };

type RequestState<TRequest> = [TRequest] extends [never]
  ? never
  : {
      request: Request<TRequest>;
    };

export type StateItem<TData, TRequest> = DataState<TData> &
  RequestState<TRequest>;
