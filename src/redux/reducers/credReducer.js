
const initialState = {
  pass: null,
  key: null,
  privateKeys: null
};

export default function credReducer(state = initialState, { type, payload }) {

  switch(type) {
    case 'SET_CREDS':
      return {
        ...state,
        pass: JSON.stringify(payload.pass),
        key: payload.key
      }
    case 'SET_KEYS':
      return {
        ...state,
        privateKeys: payload
      }
    default:
      return state;
  }
}

