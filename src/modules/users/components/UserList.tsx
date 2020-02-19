import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";

import UserListItem from "./UserItem";
import { UserStateItem } from "../models";

export interface Props {
  items: UserStateItem[];
}

const TodoList: React.FC<Props> = memo(({ items }) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16, flexGrow: 1 }}>
        <List style={{ overflow: "scroll" }}>
          {items.map((user, idx) => (
            <UserListItem
              key={`User.${user.data.id}`}
              item={user}
              divider={idx !== items.length - 1}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
