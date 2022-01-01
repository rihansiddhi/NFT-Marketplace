import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import usersReducer from "./userReducer";
import flagsReducer from "./flagsReducer";
import nftReducer from "./nftReducer";
import credReducer from "./credReducer";
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'cred'],
};

const rootReducer = combineReducers({
  user: usersReducer,
  flags: flagsReducer,
  nft: nftReducer,
  cred: credReducer
});

export default persistReducer(persistConfig, rootReducer);