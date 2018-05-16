
import * as Actions from "../actions/products";

const initialState = {
  list: [],
  notes: {},
  error: '',
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PRODUCTS:
      console.log('fetching products', action.notes);
      return {
        ...state,
        notes: action.notes || {},
      };
      break;
    case Actions.GET_PRODUCTS_SUCCESS:
      console.log('got products', action.result);
      return {
        ...state,
        list: action.result
      }
      break;
    case Actions.GET_PRODUCTS_FAILURE:
      console.log('get exception', action.exception);
      return {
        ...state,
        error: action.exception
      }
      break;
    default:
      return state;
  }
};
