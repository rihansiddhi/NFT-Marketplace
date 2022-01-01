import React, { Fragment, useEffect } from "react";
import InputField from "../helperComponents/inputField";
import PasswordField from "../helperComponents/passwordField";
import { Checkbox, FormControlLabel, makeStyles, Paper, Typography } from "@material-ui/core";
import ConnectTwitter from "./connectTwitter";
import registerContentStyles from "../../styles/LoginAndRegister/registerContent";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "../helperComponents/customButton";
import { validatePassword } from "../../utils/loginFunctions";

const RegisterContent = ({
  password,
  twitter,
  confirmPassword,
  acceptTerms,
  handleChange,
  errors,
  resetState,
}) => {

  const twitterConnected = Boolean(twitter.username && twitter.twitter_token && twitter.twitter_secret);
  const useStyles = makeStyles(registerContentStyles);
  const classes = useStyles();

  useEffect(() => {
    if (password) {
      if (validatePassword(password)) {
        errors.password && handleChange('errors', { ...errors, password: '' })
      } else {
        handleChange('errors', { ...errors, password: 'Password must contain at least one special character and one uppercase and lowercase letter, and at least 8 or more characters' })
      }
    } else {
      errors.password && handleChange('errors', { ...errors, password: '' })
    }
  }, [password]);

  // useEffect(() => {
  //   if (name) {
  //     if (errors.name) {
  //       handleChange('errors', { ...errors, name: '' })
  //     }
  //   }
  // }, [name]);

  // useEffect(() => {
  //   if (username) {
  //     if (errors.username) {
  //       handleChange('errors', {...errors, username: ''})
  //     }
  //   }
  // }, [username]);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword === password) {
        errors.confirmPassword && handleChange('errors', { ...errors, confirmPassword: '' })
      } else {
        handleChange('errors', { ...errors, confirmPassword: 'Password and Confirm Password does not match' })
      }
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (acceptTerms) {
      if (errors.acceptTerms) {
        handleChange('errors', { ...errors, acceptTerms: '' })
      }
    }
  }, [acceptTerms]);

  if (!twitterConnected) {
    return <ConnectTwitter handleChange={(value) => handleChange('twitter', value)} />
  }

  return (
    <Fragment>
      <Paper elevation={1} className={classes.TwitterTags_paperInfo}>
        <Typography variant="h6">Connected Twitter Account</Typography>
        <Typography className={classes.TwitterTags_name}>{twitter.username}</Typography>
        <Button
          variant={"outlined"}
          classes={{ root: classes.changeButton }}
          onClick={resetState}
        >
          Change connected twitter account
        </Button>
      </Paper>
      {/*<InputField*/}
      {/*  required*/}
      {/*  fullWidth*/}
      {/*  label="Name"*/}
      {/*  autoFocus*/}
      {/*  autoComplete="off"*/}
      {/*  type="text"*/}
      {/*  value={name}*/}
      {/*  onChange={(e) => handleChange('name', e.target.value)}*/}
      {/*  error={errors.name}*/}
      {/*  helperText={errors.name}*/}
      {/*/>*/}
      {/*<InputField*/}
      {/*  required*/}
      {/*  fullWidth*/}
      {/*  label="Twitter Username"*/}
      {/*  autoComplete="off"*/}
      {/*  type="text"*/}
      {/*  value={username}*/}
      {/*  onChange={(e) => handleChange('username', e.target.value)}*/}
      {/*  error={errors.username}*/}
      {/*  helperText={errors.username}*/}
      {/*/>*/}
      {/*<InputField*/}
      {/*  required*/}
      {/*  fullWidth*/}
      {/*  label="Email Address"*/}
      {/*  autoComplete="off"*/}
      {/*  type="email"*/}
      {/*  value={email}*/}
      {/*  onChange={(e) => handleChange('email', e.target.value)}*/}
      {/*  error={errors.email}*/}
      {/*  helperText={errors.email}*/}
      {/*/>*/}
      <PasswordField
        value={password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
        helperText={errors.password}
      />
      <PasswordField
        label={"Confirm Password"}
        value={confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      <FormControlLabel
        control={<Checkbox color="secondary" checked={acceptTerms} required onChange={(e) => handleChange('acceptTerms', e.target.checked)} />}
        label={<Typography>I accept the terms and conditions. <Typography display="inline" color="error">*</Typography></Typography>}
      />
      {errors.acceptTerms && <Typography display="inline" color="error">{errors.acceptTerms}</Typography>}
    </Fragment>
  );
};

export default RegisterContent;