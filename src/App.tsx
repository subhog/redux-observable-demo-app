import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { slice as todo, TodoItem, TodoList, TodoState } from "@modules/todos";
import { UserList, UsersState, UserSelector } from "@modules/users";
import {
  RequestState as RS,
  RequestType as RT,
  matchRequest as mR,
} from "@modules/common/requests";

const theme = {
  color: {
    black: "#000",
  },
  layout: {
    width: 750,
  },
  spacing: 10,
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: ${props => props.theme.color.black};
`;

const AddButton = styled(Button)`
  margin-top: ${props => props.theme.spacing}px;
`;

const App: React.FC = () => {
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState("");
  const textRef = useRef<HTMLInputElement>();

  const { entities: todos, loading: todosLoading } = useSelector<
    AppState,
    TodoState
  >(state => state.todos);

  const { entities: users, loading: usersLoading } = useSelector<
    AppState,
    UsersState
  >(state => state.users);

  const dispatch = useDispatch();

  const addNewTodo = () => {
    dispatch(
      todo.actions.add({
        text: desc,
        userId: parseFloat(user),
      })
    );
    setDesc("");
    return textRef.current?.focus();
  };

  const deleteTodo = (item: TodoItem) => {
    dispatch(todo.actions.remove(item));
  };

  const updateTodo = (item: TodoItem) => {
    dispatch(todo.actions.update(item));
  };

  const onDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onUserChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setUser(e.target.value as string);
  };

  const onReset = () => {
    dispatch(todo.actions.reset());
  };

  const onCancel = () => {
    dispatch(todo.actions.loadCancel());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper>
                  {mR(RT.read, RS.inProgress)(usersLoading.request) && (
                    <CircularProgress />
                  )}
                  {mR(RT.read, RS.success)(usersLoading.request) && (
                    <UserList items={usersLoading.data.map(id => users[id])} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ padding: theme.spacing }}>
                  <TextField
                    multiline
                    autoFocus
                    inputRef={textRef}
                    placeholder="Enter todo message"
                    rows="5"
                    variant="outlined"
                    onChange={onDescChange}
                    value={desc}
                    fullWidth
                  />
                  <div style={{ margin: "9px 0" }}>
                    <UserSelector
                      fullWidth
                      value={user}
                      onChange={onUserChange}
                    />
                  </div>
                  <AddButton
                    disabled={!desc}
                    color="primary"
                    variant="contained"
                    onClick={addNewTodo}
                    fullWidth
                  >
                    Add Todo
                  </AddButton>
                </Paper>
              </Grid>
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
                      items={todosLoading.data.map(id => todos[id])}
                      onItemUpdate={updateTodo}
                      onItemDelete={deleteTodo}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Wrap>
                  {mR(RT.read, RS.inProgress)(todosLoading.request) ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={onCancel}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={onReset}
                      color="primary"
                    >
                      Reload
                    </Button>
                  )}
                </Wrap>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
