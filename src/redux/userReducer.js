import { USER_JOIN } from "./types";

const initialState = {
  name: "",
  photo: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_JOIN:
      return {
        ...state,
        name: action.name,
        photo: action.photo,
      };
    default:
      return state;
  }
};
