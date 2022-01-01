import React, {useState} from "react";
import {Box, Card, Container, Paper} from "@material-ui/core";
import LoginContent from "./loginContent";
import RegisterContent from "./registerContent";
import btcnftLogo from "../../assets/img/bm-wide-blackbg1.png";
import {makeStyles} from "@material-ui/core/styles";
import LoginAndRegisterActions from "./loginAndRegisterActions";
import loginAndRegisterContainerStyles from "../../styles/LoginAndRegister/loginAndRegisterContainer";
import withLoginAndRegisterState from "./withLoginAndRegisterState";
import {useDispatch, useSelector} from 'react-redux';
import {loginAPI, registerAPI} from "../../apis/login";
import {setUser} from "../../redux/actions/userActions";
import {setLoader} from "../../redux/actions/flagActions";
import { Redirect } from 'react-router-dom';
import {snackbar} from "../helperComponents/snackbar";
import {loginValidation, registerValidation} from "../../utils/loginFunctions";
import { setCreds, setPrivateKeys } from "../../redux/actions/credActions";
import {linkTwitter} from "../../apis/twitterBtcnft";

const LoginAndRegisterContainer = ({
                                     state,
                                     handleStateChange,
                                     resetState,
                                   }) => {
  const { loginState, registerState } = state;
  const [form, changeForm] = useState('login');
  const useStyles = makeStyles(loginAndRegisterContainerStyles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const { twitter } = registerState;
  const twitterConnected = Boolean(twitter.username && twitter.twitter_secret && twitter.twitter_token);

  const onLogin = () => {
    const { errors, flag } = loginValidation(loginState);
    handleStateChange({ form: 'login', key: 'errors', value: errors });
    if (flag) {
    const { platform, username, password } = loginState;
    dispatch(setLoader(true));
    loginAPI({ platform, username, password }).then(async response => {
      if (response && response.data && response.data.status === 'Success') {
        await dispatch(setLoader(false));
        const { user = {} } = response.data;
        dispatch(setUser(user));
        // dispatch(setCreds(password));
        dispatch(setPrivateKeys(user.b_username, password));
      } else {
        snackbar.error("Authorization failed!");
      }
    })
      .catch(error => {
        snackbar.error(error?.response?.data?.message || "Authorization failed!");
        dispatch(setLoader(false));
      })
    }
  };

  const onRegister = () => {
    const { errors, flag } = registerValidation(registerState);
    handleStateChange({ form: 'register', key: 'errors', value: errors });
    if (flag) {
      const { twitter, password } = registerState;
      const { username, twitter_secret, twitter_token } = twitter;
      dispatch(setLoader(true));
      registerAPI({username, password, twitter_secret, twitter_token}).then(response => {
        if (response && response.data) {
          snackbar.success("Registration Successful! Your blockchain username is "+response.data.username);
          changeForm('login');
          handleStateChange({form: 'login', key: 'username', value: username});
          handleStateChange({form: 'login', key: 'password', value: ''});
          resetState('register');
        } else {
          snackbar.error("Registration failed");
        }
      })
        .catch(error => {
          snackbar.error(error?.response?.data?.message || "Registration failed");
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (form === 'login') {
      onLogin();
    } else {
      onRegister();
    }
  };

  const logo = () => <img src={ btcnftLogo } className={ classes.logo } alt="xHashtag"/>

  const component = () => form === 'login'
    ? <LoginContent handleChange={(key, value) => handleStateChange({ form: 'login', key, value })} {...loginState} />
    : <RegisterContent handleChange={(key, value) => handleStateChange({ form: 'register', key, value })} {...registerState} resetState={() => resetState('register')} />;

  if (isAuthenticated) {
    return <Redirect to='/wallet' />
  }

  return (
    <Container>
      <Box classes={{
        root: classes.container,
      }}>
        <Card raised classes={{
          root: classes.card,
        }}>
          {logo()}
          <form onSubmit={onSubmit}>
            <Box style={{ flex: '1 1 auto', padding: '16px 24px', overflowY: 'auto' }}>
              {component()}
              <Box style={{ padding: '25px 0px 15px 0px' }}>
                <LoginAndRegisterActions form={form} changeForm={changeForm} twitterConnected={twitterConnected} />
              </Box>
            </Box>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default withLoginAndRegisterState(LoginAndRegisterContainer);