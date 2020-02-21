import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState,
  RequestType,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { StateItem } from "@modules/common/models";

import { TodoStateItem, TodoItem, TodoData, createTodo } from "./models";

export interface TodoState {
  loading: StateItem<number[], undefined>;
  entities: Record<number, TodoStateItem>;
}

export const initialState: TodoState = {
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
  name: "todos",
  initialState,
  reducers: {
    load(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.inProgress,
        RequestType.read
      );
    },

    loadDone(state: TodoState, action: PayloadAction<TodoItem[]>) {
      state.loading.data = action.payload.map(item => item.id);
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.success,
        RequestType.read
      );
      action.payload.forEach(todo => {
        state.entities[todo.id] = {
          data: todo,
          request: createRequest(todo, RequestType.read, RequestState.success),
        };
      });
    },

    loadCancel(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.success,
        RequestType.read
      );
    },

    loadError(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RequestState.error,
        RequestType.read
      );
    },

    add(state: TodoState, action: PayloadAction<TodoData>) {
      const todo = createTodo(action.payload);
      state.loading.data.push(todo.id);
      state.entities[todo.id] = {
        data: todo,
        request: createRequest(todo),
      };
    },

    addDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].data = action.payload;
      state.entities[action.payload.id].request = updateRequest(
        state.entities[action.payload.id].request,
        RequestState.success,
        RequestType.create
      );
    },

    addError: {
      prepare: (item, e) => ({ payload: { item, error: e } }),
      reducer: (
        state: TodoState,
        action: PayloadAction<{ item: TodoItem; error: Error }>
      ) => {
        state.entities[action.payload.item.id].request = updateRequest(
          state.entities[action.payload.item.id].request,
          RequestState.error,
          RequestType.create
        );
      },
    },

    remove(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].request = updateRequest(
        state.entities[action.payload.id].request,
        RequestState.inProgress,
        RequestType.delete
      );
    },

    removeDone(state: TodoState, action: PayloadAction<TodoItem>) {
      // remove item from loading data
      state.loading.data.splice(
        state.loading.data.indexOf(action.payload.id),
        1
      );
      // remove item from entities
      delete state.entities[action.payload.id];
    },

    removeError: {
      prepare: (item, e) => ({ payload: { item, error: e } }),
      reducer: (
        state: TodoState,
        action: PayloadAction<{ item: TodoItem; error: Error }>
      ) => {
        state.entities[action.payload.item.id].request = updateRequest(
          state.entities[action.payload.item.id].request,
          RequestState.error,
          RequestType.delete,
          action.payload.error.message
        );
      },
    },

    update(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].request = updateRequest(
        {
          ...state.entities[action.payload.id].request,
          payload: action.payload,
        },
        RequestState.inProgress,
        RequestType.update
      );
    },

    updateDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].data = action.payload;
      state.entities[action.payload.id].request = updateRequest(
        {
          ...state.entities[action.payload.id].request,
          payload: action.payload,
        },
        RequestState.success,
        RequestType.update
      );
    },

    updateError: {
      prepare: (item, error) => ({ payload: { item, error } }),
      reducer: (
        state: TodoState,
        action: PayloadAction<{ item: TodoItem; error: Error }>
      ) => {
        state.entities[action.payload.item.id].request = updateRequest(
          state.entities[action.payload.item.id].request,
          RequestState.error,
          RequestType.update,
          action.payload.error.message
        );
      },
    },

    reset() {
      return initialState;
    },
  },
});

export { slice };
