import { Request } from "./requests";

export type Item<Id extends string | number> = {
  id: Id;
};

export type DataState<Data> = {
  data: Data;
};

export type RequestState<RequestPayload> = {
  request: Request<RequestPayload>;
};
