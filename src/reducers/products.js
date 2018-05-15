
import * as Actions from "../actions/products";

const initialState = {
  list: [],
  notes: {},
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        list: action.products,
        notes: action.notes,
      };
      break;
    default:
      return state;
  }
};
