import { Item } from "@modules/common/models";
import { Request } from "@modules/common/requests";

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface User extends UserData, Item<number> {}

export const createUser = (data: UserData): User => ({
  id: Math.random(),
  ...data,
});

export interface UserStateItem {
  data: User;
  request: Request<User>;
}
