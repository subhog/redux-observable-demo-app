import React from "react";
import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TodosView } from "@modules/todos";
import { UsersView } from "@modules/users";

const theme = {
  color: {
    black: "#000",
  },
  layout: {
    width: 750,
  },
  spacing: 10,
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/users/:userId?">
          <UsersView />
        </Route>
        <Route path="/">
          <TodosView />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
