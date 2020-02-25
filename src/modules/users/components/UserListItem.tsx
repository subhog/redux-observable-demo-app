import React, { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { UserStateItem } from "../models";

export interface Props {
  item: UserStateItem;
  divider?: boolean;
}

const UserText = styled(ListItemText)`
  color: #000;
`;

const UserListItem: React.FC<Props> = memo(({ item, divider }) => {
  const { data, request } = item;
  const labelId = `checkbox-list-secondary-label-${item.data.id}`;
  return (
    <ListItem
      button
      component={Link}
      divider={divider}
      to={`/users/${data.id}`}
    >
      <UserText
        id={labelId}
        primary={`${data.firstName} ${data.lastName}`}
        secondary={request && `Request ${request.type} ${request.state}`}
      />
    </ListItem>
  );
});

export default UserListItem;
