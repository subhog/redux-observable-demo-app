import React from "react";

import { User as UserModel } from "@modules/users/models";
import {
  RequestType as RT,
  RequestStatus as RS,
} from "@modules/common/requests";

import { List } from "@material-ui/core";
import UserItem from "./UserItem";
import { UserStateItem } from "../slice";

export default {
  title: "UserItem",
  component: UserItem,
};

const user: UserModel = {
  id: 0.23123123123312,
  email: "email@email.com",
  firstName: "First",
  lastName: "Last",
  username: "flast",
};

const item: UserStateItem = {
  data: user,
  request: {
    type: RT.read,
    status: RS.success,
    payload: user,
  },
};

export const withText = () => (
  <List>
    <UserItem item={item} />
  </List>
);
