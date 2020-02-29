import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestStatus as RS,
  RequestType as RT,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { RequestState, DataState } from "@modules/common/models";

import { User } from "./models";

export type UserStateItem = DataState<User> & RequestState<User>;
export interface UsersState {
  loading: DataState<number[]> & RequestState<unknown>;
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
});

export { slice };
