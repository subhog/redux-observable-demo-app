import { shallow, mount } from "enzyme";
import React from "react";

import {
  createRequest,
  RequestType,
  RequestState,
} from "@modules/common/requests";

import TodoList from "./TodoList";
import TodoItemComponent from "./TodoItem";
import { TodoItem } from "../models";
import { TodoStateItem } from "../slice";

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

  // Shallow for unit tests
  const shallowTodoList = shallow(
    <TodoList
      items={items}
      onItemDelete={onItemDelete}
      onItemUpdate={onItemUpdate}
    />
  );

  // Mount for integration tests
  const mountedTodoList = mount(
    <TodoList
      items={items}
      onItemDelete={onItemDelete}
      onItemUpdate={onItemUpdate}
    />
  );

  it("renders 3 todos", () => {
    expect(shallowTodoList.find(TodoItemComponent)).toHaveLength(3);
  });

  it("matches snapshot", () => {
    expect(shallowTodoList).toMatchSnapshot();
  });

  it("emits an event when delete clicked", () => {
    mountedTodoList
      .find(TodoItemComponent)
      .last()
      .find("button")
      .simulate("click");
    expect(onItemDelete.mock.calls.length).toEqual(1);
  });

  it("emits an event when checkbox clicked", () => {
    mountedTodoList
      .find(TodoItemComponent)
      .last()
      .find('input[type="checkbox"]')
      .simulate("click");
    expect(onItemUpdate.mock.calls.length).toEqual(1);
  });
});
