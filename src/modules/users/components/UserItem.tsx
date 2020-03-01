import React, { memo } from "react";
import styled from "styled-components";
import { ListItem, ListItemText } from "@material-ui/core";

import { UserStateItem } from "../slice";

export type Props = {
  item: UserStateItem;
  divider?: boolean;
  onDeleteButtonClick?: () => void;
  onCheckBoxToggle?: () => void;
};

const UserText = styled(ListItemText)`
  color: #000;
`;

const UserListItem: React.FC<Props> = memo(({ item, divider }) => {
  const { data, request } = item;

  return (
    <ListItem divider={divider}>
      <UserText
        primary={`${data.firstName} ${data.lastName}`}
        secondary={request && `Request ${request.type} ${request.status}`}
      />
    </ListItem>
  );
});

export default UserListItem;
