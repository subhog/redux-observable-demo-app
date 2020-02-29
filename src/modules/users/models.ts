import { Item } from "@modules/common/models";

export type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export type User = UserData & Item<number>;

export const createUser = (data: UserData): User => ({
  id: Math.random(),
  ...data,
});
