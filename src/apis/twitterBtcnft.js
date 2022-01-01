import * as firebase from 'firebase';
import { sdacApi } from "../apis/privateConfig";
import axios from "axios";
let db = null;
if (!firebase.apps.length) {
    if (process.env.REACT_APP_ENVIRONMENT == "development") {
        db = firebase.initializeApp(sdacApi.test);
      } else {
        db = firebase.initializeApp(sdacApi.live);
      }
 }else {
    db = firebase.app();
 }



export const linkTwitter = () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}

export const updateTwitterUser = (data, id) => {
  return axios.put(process.env.REACT_APP_DEV_URL + `/users/${id}`, data);
}

export const getTwitterUser = (id) => {
  return axios.get(process.env.REACT_APP_DEV_URL + `/users/${id}`);
}

export const getTweets = ({ from, to, hashtag }) => {
  return axios.post(process.env.REACT_APP_DEV_URL + "/tweets", {
    from,
    hashtag,
    to
  });
}