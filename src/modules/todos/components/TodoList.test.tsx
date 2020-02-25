import { shallow, mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import {
  createRequest,
  RequestType,
  RequestState,
} from "@modules/common/requests";
import { UserStateItem } from "@modules/users/models";

import TodoList from "./TodoList";
import TodoItemComponent from "./TodoItem";
import { TodoItem, TodoStateItem } from "../models";

describe("TodoList", () => {
  const onItemDelete = jest.fn();
  const onItemUpdate = jest.fn();

  const todos: TodoItem[] = [
    { id: 1, text: "Todo 1", completed: false, userId: 0 },
    { id: 2, text: "Todo 2", completed: false, userId: 0 },
    { id: 3, text: "Todo 3", completed: false, userId: 0 },
  ];

  const jdoe = {
    id: 0,
    username: "jdoe",
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
  };
  const users: Record<number, UserStateItem> = {
    [jdoe.id]: {
      data: jdoe,
      request: {
        type: RequestType.read,
        state: RequestState.success,
        payload: jdoe,
      },
    },
  };

  const items: TodoStateItem[] = todos.map(todo => ({
    data: todo,
    request: createRequest(todo, RequestType.create, RequestState.success),
  }));

  // Shallow for unit tests
  const shallowTodoList = shallow(
    <TodoList
      users={users}
      items={items}
      onItemDelete={onItemDelete}
      onItemUpdate={onItemUpdate}
    />
  );

  // Mount for integration tests
  const mountedTodoList = mount(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <TodoList
        users={users}
        items={items}
        onItemDelete={onItemDelete}
        onItemUpdate={onItemUpdate}
      />
    </MemoryRouter>
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
