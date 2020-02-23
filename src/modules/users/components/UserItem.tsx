import React, { memo } from "react";
import styled from "styled-components";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { UserStateItem } from "../models";

export interface Props {
  item: UserStateItem;
  divider?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  checked?: boolean;
}

const UserText = styled(ListItemText)`
  color: #000;
`;

const UserListItem: React.FC<Props> = memo(
  ({ item, divider, onChange, checked }) => {
    const { data, request } = item;
    const labelId = `checkbox-list-secondary-label-${item.data.id}`;
    return (
      <ListItem divider={divider}>
        <UserText
          id={labelId}
          primary={`${data.firstName} ${data.lastName}`}
          secondary={request && `Request ${request.type} ${request.state}`}
        />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={onChange}
            checked={checked}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default UserListItem;
