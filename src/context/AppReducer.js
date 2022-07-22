import { Types } from "./Types";
const AppReducer = (state, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        access: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
