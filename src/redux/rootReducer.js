import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { photoReducer } from "./photoReducer";
import { usersListReducer } from "./usersListReducer";
import { userReducer } from "./userReducer";
import { messagesReducer } from "./messagesReducer";
export const rootReducer = combineReducers({
  photoReducer,
  appReducer,
  userReducer,
  usersListReducer,
  messagesReducer,
});
