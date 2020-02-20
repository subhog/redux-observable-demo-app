import React from "react";

import { User as UserModel } from "@modules/users/models";
import { Request, RequestType, RequestState } from "@modules/common/requests";

import { List } from "@material-ui/core";
import UserItem from "./UserItem";

export default {
  title: "UserItem",
  component: UserItem,
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
    <UserItem
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
