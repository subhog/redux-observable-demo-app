import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState as RS,
  RequestType as RT,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { DataState, RequestState } from "@modules/common/models";
import { slice as todos } from "@modules/todos/slice";
import { TodoItem } from "@modules/todos/models";

import { User, UserStateItem } from "./models";

export interface UsersState {
  loading: DataState<number[]> & RequestState;
  entities: Record<number, UserStateItem>;
}

export const initialState: UsersState = {
  loading: {
    data: [],
    request: createRequest(undefined, RT.read, RS.inProgress),
  },
  entities: {},
};

// State is wrapped with immer produce so it can be mutated but the end result will be immutable
const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    load(state: UsersState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.inProgress,
        RT.read
      );
    },

    loadDone(state: UsersState, action: PayloadAction<User[]>) {
      state.loading.data = action.payload.map(item => item.id);
      state.loading.request = updateRequest(
        state.loading.request,
        RS.success,
        RT.read
      );
      action.payload.forEach(user => {
        state.entities[user.id] = {
          data: user,
          request: createRequest(user, RT.read, RS.success),
        };
      });
    },

    loadCancel(state: UsersState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.success,
        RT.read
      );
    },

    loadError(state: UsersState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.error,
        RT.read
      );
    },

    reset() {
      return initialState;
    },
  },
  extraReducers: {
    [todos.actions.loadDone.type](
      state: UsersState,
      action: PayloadAction<(TodoItem & { user?: User })[]>
    ) {
      if (!action.payload) return;
      action.payload.forEach(todo => {
        const { user } = todo;
        if (user) {
          if (!state.entities[user.id]) {
            // insert new item
            state.entities[user.id] = {
              data: user,
              request: {
                type: RT.read,
                state: RS.success,
                payload: user,
              },
            };
          }
        }
      });
    },
  },
});

export { slice };
