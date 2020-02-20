import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  RequestState,
  RequestType,
  Request,
  createRequest,
  updateRequest,
} from "@modules/common/requests";
import { TodoStateItem, TodoItem, TodoData, createTodo } from "./models";

export interface TodoState {
  loading: Request;
  entities: TodoStateItem[];
}

export const initialState: TodoState = {
  loading: createRequest(undefined, RequestType.read, RequestState.inProgress),
  entities: [],
};

// State is wrapped with immer produce so it can be mutated but the end result will be immutable
const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    load(state: TodoState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.inProgress,
        RequestType.read
      );
    },

    loadDone(state: TodoState, action: PayloadAction<TodoItem[]>) {
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

    loadCancel(state: TodoState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.success,
        RequestType.read
      );
    },

    loadError(state: TodoState) {
      state.loading = updateRequest(
        state.loading,
        RequestState.error,
        RequestType.read
      );
    },

    add(state: TodoState, action: PayloadAction<TodoData>) {
      const todo = createTodo(action.payload);
      state.entities.push({
        data: todo,
        request: createRequest(todo),
      });
    },

    addDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities = state.entities.map(todo =>
        todo.data.id === action.payload.id
          ? {
              data: todo.request.payload,
              request: updateRequest(
                todo.request,
                RequestState.success,
                RequestType.create
              ),
            }
          : todo
      );
    },

    addError: {
      prepare: (item: TodoItem, e) => ({ payload: item, error: e }),
      reducer: (state: TodoState, action: PayloadAction<TodoItem>) => {
        state.entities = state.entities.map(todo =>
          todo.data.id === action.payload.id
            ? {
                ...todo,
                request: updateRequest(
                  todo.request,
                  RequestState.error,
                  RequestType.create
                ),
              }
            : todo
        );
      },
    },

    remove(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities = state.entities.map(todo =>
        todo.data.id === action.payload.id
          ? {
              ...todo,
              request: updateRequest(
                todo.request,
                RequestState.inProgress,
                RequestType.delete
              ),
            }
          : todo
      );
    },

    removeDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities = state.entities.filter(
        todo => todo.data.id !== action.payload.id
      );
    },

    removeError: {
      prepare: (item, e) => ({ payload: { item, error: e } }),
      reducer: (
        state: TodoState,
        action: PayloadAction<{ item: TodoItem; error: Error }>
      ) => {
        state.entities = state.entities.map(todo =>
          todo.data.id === action.payload.item.id
            ? {
                ...todo,
                request: updateRequest(
                  todo.request,
                  RequestState.error,
                  RequestType.delete,
                  action.payload.error.message
                ),
              }
            : todo
        );
      },
    },

    update(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities = state.entities.map(todo =>
        todo.data.id === action.payload.id
          ? {
              ...todo,
              request: updateRequest(
                { ...todo.request, payload: action.payload },
                RequestState.inProgress,
                RequestType.update
              ),
            }
          : todo
      );
    },

    updateDone(state: TodoState, action: PayloadAction<TodoItem>) {
      state.entities = state.entities.map(todo =>
        todo.data.id === action.payload.id
          ? {
              ...todo,
              data: action.payload,
              request: updateRequest(
                { ...todo.request, payload: action.payload },
                RequestState.success,
                RequestType.update
              ),
            }
          : todo
      );
    },

    updateError: {
      prepare: (item, error) => ({ payload: { item, error } }),
      reducer: (
        state: TodoState,
        action: PayloadAction<{ item: TodoItem; error: Error }>
      ) => {
        state.entities = state.entities.map(todo =>
          todo.data.id === action.payload.item.id
            ? {
                ...todo,
                request: updateRequest(
                  todo.request,
                  RequestState.error,
                  RequestType.update,
                  action.payload.error.message
                ),
              }
            : todo
        );
      },
    },

    reset() {
      return initialState;
    },
  },
});

export { slice };
