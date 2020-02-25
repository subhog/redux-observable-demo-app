import React, { memo } from "react";
import styled from "styled-components";

import ListItemText from "@material-ui/core/ListItemText";

import { UserStateItem } from "../models";

export interface Props {
  item: UserStateItem;
}

const UserText = styled(ListItemText)`
  color: #000;
`;

const User: React.FC<Props> = memo(({ item }) => {
  const { data, request } = item;
  const labelId = `checkbox-list-secondary-label-${item.data.id}`;
  return (
    <>
      <UserText
        id={labelId}
        primary={`${data.firstName} ${data.lastName}`}
        secondary={request && `Request ${request.type} ${request.state}`}
      />
    </>
  );
});

export default User;
