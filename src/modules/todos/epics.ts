import { catchError, map, retry } from "rxjs/operators";
import { of } from "rxjs";

import {
  RequestStatus as RS,
  RequestType as RT,
  matchRequest,
} from "@modules/common/requests";
import { feedbackFlag, feedbackArray } from "@modules/common/operators";
import { StateEpic, combineStateEpics } from "@modules/common/epics";

import * as Api from "./api";
import { slice, TodoState, TodoStateItem } from "./slice";

const { actions } = slice;

const loadTodosEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.todos),
    feedbackFlag(
      state => matchRequest(RT.read, RS.inProgress)(state.loading.request),
      () =>
        Api.listTodos().pipe(
          retry(3),
          map(request => actions.loadDone(request.response)),
          catchError(() => of(actions.loadError()))
        )
    )
  );

const updateTodoEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.todos),
    feedbackArray<TodoState, TodoStateItem>(
      state =>
        Object.values(state.entities).filter(entity =>
          matchRequest(RT.update, RS.inProgress)(entity.request)
        ),
      entity =>
        Api.updateTodo(entity.data.id, entity.data).pipe(
          retry(3),
          map(() => actions.updateDone(entity.request.payload)),
          catchError(error => of(actions.updateError(entity, error)))
        )
    )
  );

const addTodoEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.todos),
    feedbackArray<TodoState, TodoStateItem>(
      state =>
        Object.values(state.entities).filter(entity =>
          matchRequest(RT.create, RS.inProgress)(entity.request)
        ),
      entity =>
        Api.createTodo(entity.data).pipe(
          map(() => actions.addDone(entity.request.payload)),
          catchError(error => of(actions.addError(entity.data, error)))
        )
    )
  );

const removeTodoEpic: StateEpic<AppState> = state$ =>
  state$.pipe(
    map(state => state.todos),
    feedbackArray<TodoState, TodoStateItem>(
      state =>
        Object.values(state.entities).filter(entity =>
          matchRequest(RT.delete, RS.inProgress)(entity.request)
        ),
      entity =>
        Api.deleteTodo(entity.data.id).pipe(
          map(() => actions.removeDone(entity.data)),
          catchError(error => of(actions.removeError(entity.data, error)))
        )
    )
  );

export default combineStateEpics(
  loadTodosEpic,
  updateTodoEpic,
  addTodoEpic,
  removeTodoEpic
);
