import { encryptPassword, getPrivateKeys } from "../../utils/loginFunctions";

export function setCreds(password){
    const { key, pass } = encryptPassword(password)
    return (dispatch) => {
      dispatch({
        type: "SET_CREDS",
        payload: { key, pass }
      })
    }
  }
  
  export function setPrivateKeys(username, password){
    return async (dispatch) => {
      try{
        const keys = await getPrivateKeys(username, password);

        dispatch({
          type: "SET_KEYS",
          payload: keys
        })
      }
      catch(e){

      }
    }
  }