import { catchError, map, retry } from "rxjs/operators";
import { of } from "rxjs";
import { ajaxGet } from "rxjs/internal-compatibility";

import {
  RequestState as RS,
  RequestType as RT,
  matchRequest,
} from "@modules/common/requests";
import { feedbackFlag } from "@modules/common/operators";
import { StateEpic, combineStateEpics } from "@modules/common/epics";

import { actions } from "./slice";

const loadEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.users),
    feedbackFlag(
      state => matchRequest(RT.read, RS.inProgress)(state.loading),
      () =>
        ajaxGet("http://localhost:5000/users").pipe(
          retry(3),
          map(request => actions.loadDone(request.response)),
          catchError(() => of(actions.loadError()))
        )
    )
  );
export default combineStateEpics(loadEpic);
