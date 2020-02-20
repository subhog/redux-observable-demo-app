import { Request } from "./requests";

export interface Item<Id extends string | number> {
  id: Id;
}

type DataState<Data> = [Data] extends [never]
  ? never
  : {
      data: Data;
    };

type RequestState<RequestPayload> = [RequestPayload] extends [never]
  ? never
  : {
      request: Request<RequestPayload>;
    };

export type StateItem<Data, RequestPayload> = DataState<Data> &
  RequestState<RequestPayload>;
