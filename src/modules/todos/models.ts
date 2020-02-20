import { Item, StateItem } from "@modules/common/models";

export interface TodoData {
  text: string;
  completed?: boolean;
}

export interface TodoItem extends TodoData, Item<number> {}

export const createTodo = (data: TodoData): TodoItem => ({
  id: Math.random(),
  completed: data.completed ?? false,
  text: data.text,
});

export type TodoStateItem = StateItem<TodoItem, TodoItem>;
