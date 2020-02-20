import { Item, StateItem } from "@modules/common/models";

export interface TodoData {
  text: string;
  completed?: boolean;
}

export type TodoItem = TodoData & Item<number>;
export type TodoStateItem = StateItem<TodoItem, TodoItem>;

export const createTodo = (data: TodoData): TodoItem => ({
  id: Math.random(),
  completed: data.completed ?? false,
  text: data.text,
});

