import React from "react";

import { User as UserModel } from "@modules/users/models";
import { Request, RequestType, RequestState } from "@modules/common/requests";

import { List } from "@material-ui/core";
import UserListItem from "./UserListItem";

export default {
  title: "UserItem",
  component: UserListItem,
};

const request: Request<UserModel> = {
  type: RequestType.read,
  state: RequestState.success,
  payload: {
    id: 0.23123123123312,
    email: "email@email.com",
    firstName: "First",
    lastName: "Last",
    username: "flast",
  },
};

export const withText = () => (
  <List>
    <UserListItem
      item={{
        data: {
          id: 0.23123123123312,
          email: "email@email.com",
          firstName: "First",
          lastName: "Last",
          username: "flast",
        },
        request,
      }}
    />
  </List>
);
