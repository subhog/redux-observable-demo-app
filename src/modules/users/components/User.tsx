import React, { memo } from "react";
import styled from "styled-components";

import {
  RequestState as RS,
  RequestType as RT,
  matchRequest as mR,
} from "@modules/common/requests";
import ListItemText from "@material-ui/core/ListItemText";

import { UserStateItem } from "../models";

export interface Props {
  user: UserStateItem;
}

const UserText = styled(ListItemText)`
  color: #000;
`;

const User: React.FC<Props> = memo(({ user }) => (
  <div style={{ padding: "16px" }}>
    {user && mR(RT.read, RS.success)(user.request) && (
      <UserText
        primary={`${user.data.firstName} ${user.data.lastName}`}
        secondary={
          user.request && `Request ${user.request.type} ${user.request.state}`
        }
      />
    )}
  </div>
));

export default User;
