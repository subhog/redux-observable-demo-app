export enum RequestState {
  inProgress = "inProgress", // Request is processing
  success = "success", // Request finished and succeeds
  error = "error", // Request finished and failed
}

export enum RequestType {
  create = "create",
  read = "read",
  update = "update",
  delete = "delete",
}

export interface Request<Payload = unknown> {
  type: RequestType;
  state: RequestState;
  payload: Payload;
  error?: Error;
}

export const matchRequest = (
  type: RequestType,
  state: RequestState | RequestState[]
) => (request: Request) =>
  request.type === type &&
  (Array.isArray(state)
    ? state.includes(request.state)
    : request.state === state);

/**
 * Creates a request object with a payload of @Payload type.
 * @typeparam Payload type parameter.
 * @param {Payload} payload Payload of the request
 * @param {RequestType} [type=RequestType.create] Type of created request. _Defaults to RequestType.create_
 * @param {RequestState} [state=RequestState.inProgress] Initial state of created request. _Defaults to RequestState.inProgress_
 */
export const createRequest = <Payload>(
  payload: Payload,
  type: RequestType = RequestType.create,
  state: RequestState = RequestState.inProgress
): Request<Payload> => ({
  type,
  state,
  payload,
});

export const canUpdate = <Payload>(
  request: Request<Payload>,
  type?: RequestType
) => (request.state === RequestState.inProgress ? request.type === type : true);

export const updateRequest = <Payload>(
  request: Request<Payload>,
  state: RequestState,
  type: RequestType,
  error?: string // Error object is not serializable so just use string
) =>
  canUpdate(request, type)
    ? ({
        ...request,
        state,
        error,
        type,
      } as Request<Payload>)
    : request;
