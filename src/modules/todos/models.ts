import { Item } from "@modules/common/models";

export type TodoData = {
  text: string;
  completed?: boolean;
};

export type TodoItem = TodoData & Item<number>;

export const createTodo = (data: TodoData): TodoItem => ({
  id: Math.random(),
  completed: data.completed ?? false,
  text: data.text,
});
