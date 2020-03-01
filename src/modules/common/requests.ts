export enum RequestStatus {
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

export type Request<Payload = unknown> = {
  type: RequestType;
  status: RequestStatus;
  payload: Payload;
  error?: Error;
};

export const matchRequest = (
  type: RequestType,
  status: RequestStatus | RequestStatus[]
) => (request: Request) =>
  request.type === type &&
  (Array.isArray(status)
    ? status.includes(request.status)
    : request.status === status);

/**
 * Creates a request object with a payload of @Payload type.
 * @typeparam Payload type parameter.
 * @param {Payload} payload Payload of the request
 * @param {RequestType} [type=RequestType.create] Type of created request. _Defaults to RequestType.create_
 * @param {RequestStatus} [status=RequestStatus.inProgress] Initial status of created request. _Defaults to RequestStatus.inProgress_
 */
export const createRequest = <Payload>(
  payload: Payload,
  type: RequestType = RequestType.create,
  status: RequestStatus = RequestStatus.inProgress
): Request<Payload> => ({
  type,
  status,
  payload,
});

export const canUpdate = <Payload>(
  request: Request<Payload>,
  type?: RequestType
) =>
  request.status === RequestStatus.inProgress ? request.type === type : true;

export const updateRequest = <Payload>(
  request: Request<Payload>,
  status: RequestStatus,
  type: RequestType,
  error?: string // Error object is not serializable so just use string
) =>
  canUpdate(request, type)
    ? ({
        ...request,
        status,
        error,
        type,
      } as Request<Payload>)
    : request;
