import React from "react";
import Button from "../helperComponents/customButton";
import {Box, makeStyles, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import connectTwitterStyles from "../../styles/LoginAndRegister/connectTwitter";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "../../redux/actions/flagActions";
import {linkTwitter} from "../../apis/twitterBtcnft";
import {snackbar} from "../helperComponents/snackbar";

const ConnectTwitter = ({
  handleChange,
}) => {
  const useStyles = makeStyles(connectTwitterStyles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.flags.isLoading);

  const handleClick = () => {
    dispatch(setLoader(true));
    linkTwitter().then(result => {
      const credential = result.credential;
      const twitter_token = credential['accessToken'];
      const twitter_secret = credential['secret'];
      const username = result.additionalUserInfo.username;
      const twitter = {
        username,
        twitter_token,
        twitter_secret,
      };
      handleChange(twitter);
    })
      .catch(error => {
        snackbar.error(error.message || "Twitter authentication failed");
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return (
    <Box
      classes={{ root: classes.twitterButton }}
      p={3}
    >
      <Button
        variant="contained"
        onClick={handleClick}
      >
        <TwitterIcon />
        &nbsp;&nbsp;<Typography variant="h5">{isLoading ? "Please wait" : "Connect with Twitter"}</Typography>
      </Button>
    </Box>
  );
};

export default ConnectTwitter;