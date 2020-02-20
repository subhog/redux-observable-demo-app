import { shallow } from "enzyme";
import React from "react";

import {
  createRequest,
  RequestType,
  RequestState,
} from "@modules/common/requests";

import UserList from "./UserList";
import UserItemComponent from "./UserItem";
import { User, UserStateItem } from "../models";

describe("TodoList", () => {
  const todos: User[] = [
    {
      id: 0.3213123123123133,
      email: "vb@vb.com",
      firstName: "Vinko",
      lastName: "Bradvica",
      username: "vbradvica",
    },
    {
      id: 0.321312324343243,
      email: "np@np.com",
      firstName: "Nikola",
      lastName: "Predovan",
      username: "npredovan",
    },
    {
      id: 0.3122323423442,
      email: "hog@hog.com",
      firstName: "Hubert",
      lastName: "Orlik-Grzesik",
      username: "hubertOG",
    },
    {
      id: 0.5345233223243,
      email: "ma@ma.com",
      firstName: "Mike",
      lastName: "Arlington",
      username: "marlignton",
    },
    {
      id: 0.31234512423,
      email: "ser@ser.com",
      firstName: "Shah",
      lastName: "El-Rahman",
      username: "selrahman",
    },
  ];

  const items: UserStateItem[] = todos.map(todo => ({
    data: todo,
    request: createRequest(todo, RequestType.create, RequestState.success),
  }));

  const todoList = shallow(<UserList items={items} />);

  it("renders 5 users", () => {
    expect(todoList.find(UserItemComponent)).toHaveLength(5);
  });

  it("matches snapshot", () => {
    expect(todoList).toMatchSnapshot();
  });
});
