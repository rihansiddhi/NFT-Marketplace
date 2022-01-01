import React, {Fragment, useEffect} from "react";
import InputField from "../helperComponents/inputField";
import PasswordField from "../helperComponents/passwordField";
import {Checkbox, FormControlLabel, Grid, Typography} from "@material-ui/core";
import loginContentStyles from "../../styles/Dialogs/loginContent";
import {makeStyles} from "@material-ui/core/styles";
import Select from "../helperComponents/staticSelect";
import {platformOptions} from "../../constants/NftListing";

const LoginContent = ({
  platform,
  username,
  password,
  handleChange,
  errors,
                      }) => {
  const useStyles = makeStyles(loginContentStyles);
  const classes = useStyles();
  useEffect(() => {
    if (username) {
      if (errors.username) {
        handleChange('errors', { ...errors, username: '' })
      }
    }
  }, [username]);

  useEffect(() => {
    if (password) {
      if (errors.password) {
        handleChange('errors', { ...errors, password: '' })
      }
    }
  }, [password]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Select
            autoFocus
            value={platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            data={platformOptions}
            label="Platform"
            required
          />
        </Grid>
        <Grid item xs={7}>
          <InputField
            required
            fullWidth
            label="Username"
            autoComplete="off"
            type="text"
            value={username}
            onChange={(e) => handleChange('username', e.target.value)}
            error={errors.username}
            helperText={errors.username}
          />
        </Grid>
      </Grid>
      <PasswordField
        value={password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
        helperText={errors.password}
      />
      {/*<FormControlLabel*/}
      {/*  control={<Checkbox color="secondary" checked={rememberMe}  onChange={(e) => handleChange('rememberMe', e.target.checked)}/>}*/}
      {/*  label={<Typography>Remember me</Typography>}*/}
      {/*/>*/}
    </Fragment>
  );
};

export default LoginContent;