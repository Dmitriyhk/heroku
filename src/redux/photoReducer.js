import { PHOTO_LOAD } from "./types";

const initialState = {
  photo: "",
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_LOAD:
      return {
        ...state,
        photo: action.data.url,
      };
    default:
      return state;
  }
};
