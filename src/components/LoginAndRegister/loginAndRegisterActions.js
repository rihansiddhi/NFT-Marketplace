import React, {Fragment} from "react";
import Button from "../helperComponents/customButton";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import loginAndRegisterActions from "../../styles/LoginAndRegister/loginAndRegisterActions";
import {useSelector} from "react-redux";
import GradientText from "../helperComponents/gradientText";

const LoginAndRegisterActions = ({
  form,
  changeForm,
  twitterConnected,
                                 }) => {
  const useStyles = makeStyles(loginAndRegisterActions);
  const classes = useStyles();
  const isLoading = useSelector(state => state.flags.isLoading);
  return (
    <Fragment>
      {(form !== 'register' || twitterConnected)
      && <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait' : form === 'login' ? 'Login': 'Register'}
      </Button>}
      <Typography
        classes={{
          root: classes.helperText,
        }}
        align="center"
        color="textPrimary"
      >
        {form === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
      </Typography>
      <Typography
        classes={{
          root: classes.actionText,
        }}
        align="center"
        color="primary"
        tabIndex={0}
        role="button"
        onClick={() => !isLoading && changeForm(form === 'login' ? 'register' : 'login')}
      >

        <GradientText text={form === 'login' ? 'Register' : 'Sign in here'} />
      </Typography>
    </Fragment>
  );
};

export default LoginAndRegisterActions;