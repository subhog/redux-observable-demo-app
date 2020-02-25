import React, { memo } from "react";
import { List, Typography } from "@material-ui/core";

import { TodoItem, TodoStateItem } from "@modules/todos/models";
import { UserStateItem } from "@modules/users";

import TodoListItem from "./TodoItem";

export interface Props {
  items: TodoStateItem[];
  users: Record<number, UserStateItem>;
  onItemDelete: (item: TodoItem) => void;
  onItemUpdate: (item: TodoItem) => void;
}

const TodoList: React.FC<Props> = memo(
  ({ items, users, onItemDelete, onItemUpdate }) => (
    <>
      {items.length > 0 && (
        <List style={{ overflow: "scroll" }}>
          {items.map((todo, idx) => (
            <TodoListItem
              key={`TodoItem.${todo.data.id}`}
              item={todo}
              user={todo.data.userId ? users[todo.data.userId] : undefined}
              divider={idx !== items.length - 1}
              onDeleteButtonClick={() => onItemDelete(todo.data)}
              onCheckBoxToggle={() =>
                onItemUpdate({
                  ...todo.data,
                  completed: !todo.data.completed,
                })
              }
            />
          ))}
        </List>
      )}
      {items.length === 0 && (
        <Typography style={{ padding: "16px" }}>
          No items found for this user.
        </Typography>
      )}
    </>
  )
);

export default TodoList;
