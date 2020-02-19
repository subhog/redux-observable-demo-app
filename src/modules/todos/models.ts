import { Item } from "@modules/common/models";
import { Request } from "@modules/common/requests";

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

export interface TodoStateItem {
  data: TodoItem;
  request: Request<TodoItem>;
}
