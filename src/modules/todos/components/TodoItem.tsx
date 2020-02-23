import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import RepeatRounded from "@material-ui/icons/RepeatRounded";

import {
  RequestState as RS,
  RequestType as RT,
  matchRequest,
} from "@modules/common/requests";
import { UserStateItem } from "@modules/users";
import { TodoStateItem } from "@modules/todos/models";

export interface Props {
  item: TodoStateItem;
  user?: UserStateItem;
  divider?: boolean;
  onDeleteButtonClick?: () => void;
  onCheckBoxToggle?: () => void;
}

const TodoText = styled(ListItemText)`
  color: #000000;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const TodoListItem: React.FC<Props> = memo(
  ({ item, user, divider, onDeleteButtonClick, onCheckBoxToggle }) => {
    const classes = useStyles();
    return (
      <ListItem divider={divider}>
        {matchRequest(RT.update, RS.inProgress)(item.request) ? (
          <CircularProgress size={42} color="secondary" />
        ) : (
          <Checkbox onClick={onCheckBoxToggle} checked={item.data.completed} />
        )}

        <TodoText
          primary={item.data.text}
          secondary={
            <>
              {user && (
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${user.data.firstName} ${user.data.lastName} - `}
                </Typography>
              )}
              {item.request &&
                `Request ${item.request.type} ${item.request.state}`}
            </>
          }
        />

        {!matchRequest(RT.delete, [RS.inProgress, RS.error])(item.request) ? (
          <ListItemSecondaryAction>
            <IconButton
              name="todo-delete"
              aria-label="Delete Todo"
              onClick={onDeleteButtonClick}
            >
              <DeleteOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}

        {matchRequest(RT.delete, RS.error)(item.request) ? (
          <ListItemSecondaryAction>
            <IconButton
              name="todo-delete-retry"
              aria-label="Retry Todo"
              onClick={onDeleteButtonClick}
            >
              <RepeatRounded />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}

        {matchRequest(RT.delete, RS.inProgress)(item.request) ? (
          <ListItemSecondaryAction>
            <CircularProgress size={42} />
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
    );
  }
);

export default TodoListItem;
