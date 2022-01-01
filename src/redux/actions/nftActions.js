import {filterAssets} from "../../utils/nftCardFunctions";
import {snackbar} from "../../components/helperComponents/snackbar";
import * as sdac from "museblockchain-js";
import {setLoader} from "../../redux/actions/flagActions";

export function setMyNfts(value) {
  const myNfts = filterAssets(value);
  return (dispatch) => {
    dispatch({
      type: 'SET_MY_NFTS',
      payload: myNfts,
    });
  };
}

export function getMyNfts() {
  return async (dispatch, getState) => {
    const state = getState();
    const username = state.user.username;
    await dispatch(setLoader(true));
    try {
      const response = await sdac.getAssets(username);
      if(Array.isArray(response)){
        const myNfts = filterAssets(response);
        dispatch({
          type: 'SET_MY_NFTS',
          payload: myNfts,
        });
      }
    }
    catch(e){
      snackbar.error('Something went wrong! Please contact support');
    } finally {
      dispatch(setLoader(false));
    }
  };
}

export function onSearch(value) {
  return (dispatch) => {
    dispatch({
      type: 'ON_SEARCH',
      payload: value,
    });
  };
}

export function selectNft(value) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_NFT',
      payload: value,
    });
  };
}

export function resetNftReducer() {
  return (dispatch) => {
    dispatch({
      type: 'RESET_NFT_REDUCER',
    });
  };
}
