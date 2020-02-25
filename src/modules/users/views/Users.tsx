import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { slice as todo, TodoState, TodoList, TodoItem } from "@modules/todos";
import {
  RequestState as RS,
  RequestType as RT,
  matchRequest as mR,
} from "@modules/common/requests";

import { UsersState } from "../slice";
import UserList from "../components/UserList";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: ${props => props.theme.color.black};
`;

const Users = () => {
  const dispatch = useDispatch();
  const { userId = "" } = useParams();
  const { entities: todos, loading: todosLoading } = useSelector<
    AppState,
    TodoState
  >(state => state.todos);

  const { entities: users, loading: usersLoading } = useSelector<
    AppState,
    UsersState
  >(state => state.users);

  const deleteTodo = (item: TodoItem) => {
    dispatch(todo.actions.remove(item));
  };

  const updateTodo = (item: TodoItem) => {
    dispatch(todo.actions.update(item));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                {mR(RT.read, RS.inProgress)(usersLoading.request) && (
                  <CircularProgress />
                )}
                <Switch>
                  <Route path="/users/:userId">
                    <User user={users[userId]} />
                  </Route>
                  <Route exact path="/users">
                    {mR(RT.read, RS.success)(usersLoading.request) && (
                      <UserList
                        selectedUserId={userId}
                        items={usersLoading.data.map(id => users[id])}
                      />
                    )}
                  </Route>
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                {mR(RT.read, RS.inProgress)(todosLoading.request) && (
                  <Wrap>
                    <CircularProgress />
                  </Wrap>
                )}

                {mR(RT.read, RS.error)(todosLoading.request) && (
                  <Typography color="error">Failed to load todos</Typography>
                )}

                {mR(RT.read, RS.success)(todosLoading.request) && (
                  <TodoList
                    users={users}
                    items={Object.values(todos).filter(
                      t => t.data.userId && t.data.userId.toString() === userId
                    )}
                    onItemUpdate={updateTodo}
                    onItemDelete={deleteTodo}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
