import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import { TodoItem as TodoModel, createTodo } from "@modules/todos/models";
import {
  RequestType as RT,
  RequestStatus as RS,
} from "@modules/common/requests";

import { List } from "@material-ui/core";

import TodoItem from "./TodoItem";
import { TodoStateItem } from "../slice";

export default {
  title: "TodoItem",
  component: TodoItem,
  decorators: [withKnobs],
};

const todo: TodoModel = {
  text: "Hello World Todo Item",
  id: 0.23123123123312,
  completed: true,
};

const item: TodoStateItem = {
  data: todo,
  request: {
    payload: todo,
    status: RS.success,
    type: RT.read,
  },
};

export const withText = () => (
  <List>
    <TodoItem onCheckBoxToggle={action("checked")} item={item} />
  </List>
);

export const withRequest = () => {
  const typeSelectKnob = select(
    "Request Type",
    {
      Create: RT.create,
      Delete: RT.delete,
      Read: RT.read,
      Update: RT.update,
    },
    RT.create
  );

  const statusSelectKnob = select(
    "Request Status",
    {
      InProgress: RS.inProgress,
      Success: RS.success,
      Error: RS.error,
    },
    RS.inProgress
  );

  const todoKnobs = createTodo({ text: "Change knob values" });
  return (
    <List>
      <TodoItem
        onCheckBoxToggle={action("checked")}
        item={{
          data: todoKnobs,
          request: {
            type: typeSelectKnob,
            status: statusSelectKnob,
            payload: todoKnobs,
          },
        }}
      />
    </List>
  );
};
