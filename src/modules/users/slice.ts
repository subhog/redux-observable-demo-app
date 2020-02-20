import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState,
  RequestType,
  Request,
  createRequest,
  updateRequest,
} from "@modules/common/requests";

import { UserStateItem, User } from "./models";

export interface UsersState {
  loading: Request;
  entities: UserStateItem[];
}

export const initialState: UsersState = {
  loading: createRequest(undefined, RequestType.read, RequestState.inProgress),
  entities: [],
};

// State is wrapped with immer produce so it can be mutated but the end result will be immutable
const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    load(state: UsersState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.inProgress,
        RequestType.read
      );
    },

    loadDone(state: UsersState, action: PayloadAction<User[]>) {
      state.loading = updateRequest(
        state.loading,
        RequestState.success,
        RequestType.read
      );
      state.entities = action.payload.map(todo => ({
        data: todo,
        request: createRequest(todo, RequestType.read, RequestState.success),
      }));
    },

    loadCancel(state: UsersState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.success,
        RequestType.read
      );
    },

    loadError(state: UsersState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.error,
        RequestType.read
      );
    },

    reset() {
      return initialState;
    },
  },
});

export const { name, reducer, actions } = slice;
