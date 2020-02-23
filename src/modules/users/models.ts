import { Item, DataState, RequestState } from "@modules/common/models";

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type User = UserData & Item<number>;

export const createUser = (data: UserData): User => ({
  id: Math.random(),
  ...data,
});

export type UserStateItem = DataState<User> & RequestState<User>;
