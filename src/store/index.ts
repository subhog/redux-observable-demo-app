import { combineReducers, Action } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import { slice as todos, epics as todosEpics } from "@modules/todos";
import { slice as users, epics as usersEpics } from "@modules/users";

const reducer = combineReducers({
  todos: todos.reducer,
  users: users.reducer,
});

type CombinedState = ReturnType<typeof reducer>;

// App store declared globally so it can be referenced anywhere
// without cycle imports
declare global {
  export type AppState = CombinedState;
}

export function createStore() {
  const logger = createLogger();
  // Set state type explicitly to avoid redux-observable TS bug
  const epicMiddleware = createEpicMiddleware<
    Action<unknown>,
    Action<unknown>,
    AppState
  >();
  const rootEpic = combineEpics(todosEpics, usersEpics);

  const middleware = [...getDefaultMiddleware(), epicMiddleware, logger];

  const store = configureStore({
    reducer,
    middleware,
  });

  epicMiddleware.run(rootEpic);

  return store;
}
