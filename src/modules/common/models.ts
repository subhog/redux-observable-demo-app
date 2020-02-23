import { Request } from "./requests";

export interface Item<Id extends string | number> {
  id: Id;
}

export type DataState<Data> = {
  data: Data;
};

export type RequestState<RequestPayload = unknown> = {
  request: Request<RequestPayload>;
};
