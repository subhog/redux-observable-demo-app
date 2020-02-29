import { Item } from "@modules/common/models";

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
