

export function setUser(value) {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      payload: value,
    });
  };
}

export function resetUser() {
  return (dispatch) => {
    dispatch({
      type: 'RESET_USER',
    });
  };
}

export function setTwitter(value){
  return (dispatch) => {
    dispatch({
      type: "SET_TWITTER",
      payload: value
    })
  }
}

