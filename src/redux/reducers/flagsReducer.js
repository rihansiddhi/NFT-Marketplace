const initialState = {
  isLoading: false,
};

export default function flagsReducer(state = initialState, { type, payload }) {

  switch(type) {
    case 'SET_LOADER':
      return {
        ...state,
        isLoading: payload,
      }
    default:
      return state;
  }
}