import { shallow } from "enzyme";
import React from "react";

import {
  createRequest,
  RequestType,
  RequestState,
} from "@modules/common/requests";

import TodoList from "./TodoList";
import TodoItemComponent from "./TodoItem";
import { TodoItem, TodoStateItem } from "../models";

describe("TodoList", () => {
  const onItemDelete = jest.fn();
  const onItemUpdate = jest.fn();

  const todos: TodoItem[] = [
    { id: 1, text: "Todo 1", completed: false },
    { id: 2, text: "Todo 2", completed: false },
    { id: 3, text: "Todo 3", completed: false },
  ];

  const items: TodoStateItem[] = todos.map(todo => ({
    data: todo,
    request: createRequest(todo, RequestType.create, RequestState.success),
  }));

  const todoList = shallow(
    <TodoList
      items={items}
      onItemDelete={onItemDelete}
      onItemUpdate={onItemUpdate}
    />
  );

  it("renders 3 todos", () => {
    expect(todoList.find(TodoItemComponent)).toHaveLength(3);
  });

  it("emits an event when delete clicked", () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    todoList
      .find(TodoItemComponent)
      .last()
      .invoke("onDeleteButtonClick")!();
    expect(onItemDelete.mock.calls.length).toEqual(1);
  });

  it("emits an event when delete clicked", () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    todoList
      .find(TodoItemComponent)
      .last()
      .invoke("onCheckBoxToggle")!();
    expect(onItemUpdate.mock.calls.length).toEqual(1);
  });

  it("matches snapshot", () => {
    expect(todoList).toMatchSnapshot();
  });
});
