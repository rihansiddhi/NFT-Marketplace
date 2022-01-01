const initialState = {
  myNfts: [],
  query: '',
  selectedNft: null,
};

export default function nftReducer(state = initialState, { type, payload }) {

  switch(type) {
    case 'SET_MY_NFTS':
      return {
        ...state,
        myNfts: payload,
      }
    case 'ON_SEARCH':
      return {
        ...state,
        query: payload,
      }

    case 'SELECT_NFT':
      return {
        ...state,
        selectedNft: payload,
      }
    case 'RESET_NFT_REDUCER':
      return {
        ...initialState,
      }
    default:
      return state;
  }
}

