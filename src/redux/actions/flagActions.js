export function setLoader(value) {
  return (dispatch) => {
    dispatch({
      type: 'SET_LOADER',
      payload: value,
    });
  };
}
