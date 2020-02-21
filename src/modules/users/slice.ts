import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState,
  RequestType,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { StateItem } from "@modules/common/models";

import { User, UserStateItem } from "./models";

export interface UsersState {
  loading: StateItem<number[], unknown>;
  entities: Record<number, UserStateItem>;
}

export const initialState: UsersState = {
  loading: {
    data: [],
    request: createRequest(
      undefined,
      RequestType.read,
      RequestState.inProgress
    ),
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
        RequestState.inProgress,
        RequestType.read
      );
    },

    loadDone(state: UsersState, action: PayloadAction<User[]>) {
      state.loading.data = action.payload.map(item => item.id);
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.success,
        RequestType.read
      );
      action.payload.forEach(user => {
        state.entities[user.id] = {
          data: user,
          request: createRequest(user, RequestType.read, RequestState.success),
        };
      });
    },

    loadCancel(state: UsersState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.success,
        RequestType.read
      );
    },

    loadError(state: UsersState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.error,
        RequestType.read
      );
    },

    reset() {
      return initialState;
    },
  },
});

export { slice };
