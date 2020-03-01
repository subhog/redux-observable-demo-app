import { catchError, map, retry } from "rxjs/operators";
import { of } from "rxjs";

import {
  RequestStatus as RS,
  RequestType as RT,
  matchRequest,
} from "@modules/common/requests";
import { feedbackFlag } from "@modules/common/operators";
import { StateEpic, combineStateEpics } from "@modules/common/epics";

import * as Api from "./api";
import { slice } from "./slice";

const { actions } = slice;

const loadEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.users),
    feedbackFlag(
      state => matchRequest(RT.read, RS.inProgress)(state.loading.request),
      () =>
        Api.listUsers().pipe(
          retry(3),
          map(request => actions.loadDone(request.response)),
          catchError(() => of(actions.loadError()))
        )
    )
  );
export default combineStateEpics(loadEpic);
