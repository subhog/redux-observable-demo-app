import { shallow } from "enzyme";
import React from "react";

import {
  createRequest,
  RequestType,
  RequestState,
} from "@modules/common/requests";

import TodoItemComponent from "./TodoItem";
import { TodoItem } from "../models";
import { TodoStateItem } from "../slice";

describe("TodoItem", () => {
  const onItemDelete = jest.fn();
  const onItemUpdate = jest.fn();

  const todoItem: TodoItem = { id: 1, text: "Todo 1", completed: false };
  const item: TodoStateItem = {
    data: todoItem,
    request: createRequest(todoItem, RequestType.create, RequestState.success),
  };

  // Shallow for unit tests
  const todo = shallow(
    <TodoItemComponent
      item={item}
      onCheckBoxToggle={onItemUpdate}
      onDeleteButtonClick={onItemDelete}
    />
  );

  it("matches snapshot", () => {
    expect(todo).toMatchSnapshot();
  });
});
