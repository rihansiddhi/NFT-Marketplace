import axios from "axios";

export const loginAPI = ({ platform, username, password }) => {
  return axios.post(process.env.REACT_APP_DEV_URL + "/auth/3/login", {
    platform,
    username,
    password,
  });
};

export const registerAPI = ({
                              username,
                              password,
                              twitter_secret,
                              twitter_token,
                            }) => {
  return axios.post(process.env.REACT_APP_DEV_URL + "/auth/3/register", {
    password,
    twitter: {
      username,
      token: twitter_token,
      secret: twitter_secret,
    },
  });
};