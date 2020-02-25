import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { UsersState } from "@modules/users/slice";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type SelectUserParamsType = {
  fullWidth: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
};

const SelectUser = ({ fullWidth, value, onChange }: SelectUserParamsType) => {
  const classes = useStyles();

  const { entities } = useSelector<AppState, UsersState>(state => state.users);

  return (
    <FormControl fullWidth={fullWidth} className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChange}
      >
        {Object.entries(entities).map(([userId, userItem]) => (
          <MenuItem key={userId} value={userId}>
            {`${userItem.data.firstName} ${userItem.data.lastName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectUser;
