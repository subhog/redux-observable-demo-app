import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState as RS,
  RequestType as RT,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { RequestState, DataState } from "@modules/common/models";
import { User } from "@modules/users/models";

import { TodoStateItem, TodoItem, TodoData, createTodo } from "./models";

export interface TodoState {
  loading: DataState<number[]> & RequestState;
  entities: Record<number, TodoStateItem>;
}

export const initialState: TodoState = {
  loading: {
    data: [],
    request: createRequest(undefined, RT.read, RS.inProgress),
  },
  entities: {},
};

const removeUser = (item: TodoItem & { user?: User }) => {
  const { user, ...todo } = item;
  return todo as TodoItem;
};

// State is wrapped with immer produce so it can be mutated but the end result will be immutable
const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    load(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.inProgress,
        RT.read
      );
    },

    loadDone(
      state: TodoState,
      action: PayloadAction<(TodoItem & { user?: User })[]>
    ) {
      state.loading.data = action.payload.map(item => item.id);
      action.payload.forEach(todo => {
        state.entities[todo.id] = {
          data: removeUser(todo),
          request: createRequest(todo, RT.read, RS.success),
        };
      });
      state.loading.request = updateRequest(
        state.loading.request,
        RS.success,
        RT.read
      );
    },

    loadCancel(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.success,
        RT.read
      );
    },

    loadError(state: TodoState) {
      state.loading.request = updateRequest(
        state.loading.request,
        RS.error,
        RT.read
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
        RS.success,
        RT.create
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
          RS.error,
          RT.create
        );
      },
    },

    remove(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].request = updateRequest(
        state.entities[action.payload.id].request,
        RS.inProgress,
        RT.delete
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
          RS.error,
          RT.delete,
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
        RS.inProgress,
        RT.update
      );
    },

    updateDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities[action.payload.id].data = action.payload;
      state.entities[action.payload.id].request = updateRequest(
        {
          ...state.entities[action.payload.id].request,
          payload: action.payload,
        },
        RS.success,
        RT.update
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
          RS.error,
          RT.update,
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
