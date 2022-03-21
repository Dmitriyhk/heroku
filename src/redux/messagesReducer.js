import { MESSAGES_LOAD, NEW_MESSAGE } from "./types";

const initialState = {
  messages: [],
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_LOAD:
      return {
        ...state,
        messages: action.messages,
      };
    case NEW_MESSAGE:
      const { userName, userPhoto, text, img } = action;
      return {
        ...state,
        messages: [...state.messages, { userName, userPhoto, text, img }],
      };

    default:
      return state;
  }
};
