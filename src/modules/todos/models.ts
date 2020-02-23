import { Item, DataState, RequestState } from "@modules/common/models";
import { User } from "@modules/users/models";

export interface TodoData {
  text: string;
  completed?: boolean;
  userId?: User["id"];
}

export type TodoItem = TodoData & Item<number>;
export type TodoStateItem = DataState<TodoItem> & RequestState<TodoItem>;

export const createTodo = (data: TodoData): TodoItem => ({
  id: Math.random(),
  completed: data.completed ?? false,
  text: data.text,
  userId: data.userId,
});
