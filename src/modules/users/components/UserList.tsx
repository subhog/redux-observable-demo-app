import React, { memo } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import UserListItem from "./UserItem";
import { UserStateItem } from "../slice";

export type Props = {
  items: UserStateItem[];
};

const TodoList: React.FC<Props> = memo(({ items }) => (
  <>
    {items.length > 0 && (
      <List
        style={{ overflow: "scroll", flexGrow: 1 }}
        subheader={<ListSubheader>Users</ListSubheader>}
      >
        {items.map((user, idx) => (
          <UserListItem
            key={`User.${user.data.id}`}
            item={user}
            divider={idx !== items.length - 1}
          />
        ))}
      </List>
    )}
  </>
));

export default TodoList;
