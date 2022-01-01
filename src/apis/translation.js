import axios from "axios";

export const translationAPI = ({ username, platform }) => {
  return axios.post(process.env.REACT_APP_DEV_URL + "/users/translate", {
    username,
    platform,
  });
};