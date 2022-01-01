import {userOnFetch} from "../../utils/loginFunctions";

const initialState = {
  isAuthenticated: false,
  username: '',
  email: '',
  id: '',
  photo: '',
  roles: null,
  twitter: null,
};

export default function usersReducer(state = initialState, { type, payload }) {

  switch(type) {
    case 'SET_USER':
      const user = userOnFetch(payload);
      return {
        ...user,
      }
    case 'RESET_USER':
      return {
        ...initialState,
      }
    case 'SET_TWITTER':
      return {
        ...state,
        twitter: payload
      }
    default:
      return state;
  }
}

