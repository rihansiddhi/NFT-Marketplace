import React, {useState} from "react";
import CustomDialog from "../helperComponents/customDialog";
import btcnftLogo from "../../assets/img/bm-wide-blackbg1.png";
import {makeStyles} from "@material-ui/core/styles";
import loginAndRegisterDialogStyles from "../../styles/Dialogs/loginAndRegisterDialog";
import LoginContent from "../LoginAndRegister/loginContent";
import RegisterContent from "../LoginAndRegister/registerContent";
import LoginAndRegisterActions from "../LoginAndRegister/loginAndRegisterActions";
import withLoginAndRegisterState from "../LoginAndRegister/withLoginAndRegisterState";
import {loginValidation, registerValidation} from "../../utils/loginFunctions";
import {setLoader} from "../../redux/actions/flagActions";
import {loginAPI, registerAPI} from "../../apis/login";
import {setUser} from "../../redux/actions/userActions";
import {setPrivateKeys} from "../../redux/actions/credActions";
import {snackbar} from "../helperComponents/snackbar";
import {linkTwitter} from "../../apis/twitterBtcnft";
import {useDispatch} from "react-redux";

const LoginAndRegisterDialog = ({
                                  open,
                                  onClose,
                                  state,
                                  handleStateChange,
                                  resetState,
                                }) => {
  const { loginState, registerState } = state;
  const useStyles = makeStyles(loginAndRegisterDialogStyles);
  const classes = useStyles();
  const [form, changeForm] = useState('login');
  const dispatch = useDispatch();
  const { twitter } = registerState;
  const twitterConnected = Boolean(twitter.username && twitter.twitter_secret && twitter.twitter_token);

  const title = () => {
    return (<img src={ btcnftLogo } className={ classes.logo } alt="xHashtag"/>);
  };

  const content = () => form === 'login'
    ? <LoginContent handleChange={(key, value) => handleStateChange({ form: 'login', key, value })} {...loginState} />
    : <RegisterContent handleChange={(key, value) => handleStateChange({ form: 'register', key, value })} {...registerState} resetState={() => resetState('register')} />;


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
          snackbar.success("Welcome " + username);
          onClose();
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

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title={title()}
      content={content()}
      actions={<LoginAndRegisterActions form={form} changeForm={changeForm} twitterConnected={twitterConnected} />}
      onFormSubmit={onSubmit}
    />
  );

};

export default withLoginAndRegisterState(LoginAndRegisterDialog);