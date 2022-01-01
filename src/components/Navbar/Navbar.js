import React from 'react';
import { AppBar, Container, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import Button from '../helperComponents/customButton.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import btcnftLogo from '../../assets/img/bm-wide-blackbg1.png';
import { Fragment } from 'react';
import LoginAndRegisterDialog from "../Dialogs/loginAndRegisterDialog";
import {useDispatch, useSelector} from "react-redux";
import {resetUser} from "../../redux/actions/userActions";
import {Redirect} from "react-router-dom";
import {resetNftReducer, selectNft, setMyNfts} from "../../redux/actions/nftActions";

const useStyles = makeStyles((theme) => ({
      Navbar_root: {
        flexGrow: 1,
      },
      Navbar_logo: {
        height: 33,
      },
      Navbar_logowrap:{
          flexGrow: 1
      },
      Navbar_appBar:{
          backgroundColor: theme.palette.common.darkBlack,
          boxShadow: "none",
          borderBottom: "1px solid #353945"
      },
      Navbar_userName: {
          display: 'flex',
          alignItems: 'center',
          fontSize: "1rem",
          marginLeft: 5,
          color: '#FCFCFD',
      },
      Navbar_profile:{
          display: 'flex',
          alignItems: "center",
          border: '2px solid #353945',
          borderRadius: '90px',
      },
      Navbar_accountCircle:{
          fontSize: 24
      },
      Navbar_profileButton: {
          textTransform: "none"
      },
      Navbar_menu: {
        marginTop: 6,
      },
}));

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openLogin, setOpenLogin] = React.useState(false);
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const name = useSelector(state => state.user.name);
    const twitter = useSelector(state => state.user.twitter);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
      dispatch(resetUser());
      dispatch(resetNftReducer());
    };

    if (!isAuthenticated) {
      return <Redirect to={'/'} />
    }

    return (
      <div className={classes.Navbar_root}>
        <AppBar position="static" className={ classes.Navbar_appBar }>
            <Container disableGutters>
                <Toolbar>
                  <div className={ classes.Navbar_logowrap}>
                    <img src={ btcnftLogo } className={ classes.Navbar_logo } alt="xHashtag"/>
                  </div>
                  {isAuthenticated && (
                        <Fragment>
                        <div className={classes.Navbar_profile}>
                            <Button className={classes.Navbar_profileButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <AccountCircleIcon className={ classes.Navbar_accountCircle }/>
                                <Typography className={classes.Navbar_userName}>{twitter.username || username}</Typography>
                            </Button>
                        </div>
                        <Menu
                          id="simple-menu"
                          PopoverClasses={{ paper: classes.Navbar_menu }}
                          getContentAnchorEl={null}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Support</MenuItem>
                          <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </Menu>
                        </Fragment>
                    )}
                         {/*<Button variant="contained" onClick={() => setOpenLogin(!openLogin)}>Login</Button>*/}
                </Toolbar>
              {openLogin && <LoginAndRegisterDialog open={openLogin} onClose={() => setOpenLogin(!openLogin)} />}
            </Container>
        </AppBar>
      </div>
    );
}

export default Navbar;
