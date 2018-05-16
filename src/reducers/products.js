import { AsyncStorage } from 'react-native';
import * as Actions from '../actions/products';

const initialState = {
  list: [],
  comments: {},
  error: '',
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_COMMENT:
      // first lets get the comments so we can push onto it
      const productComments = state.comments[action.comment.id] || [];
      productComments.push(action.comment.value);
      // to avoid mutating the state directly create a shallow copy
      const comments = {
        ...state.comments
      };
      //override the array of comments for a given id
      comments[action.comment.id] = productComments;
      // update our async Storage, we don't await as it doesn't affect our reducer
      AsyncStorage.setItem('@DIG_Demo:comments', JSON.stringify(comments));
      return {
        ...state,
        comments
      }
    case Actions.GET_PRODUCTS:
      return {
        ...state,
        comments: action.comments || {},
      };
      break;
    case Actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.result
      }
      break;
    case Actions.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.exception
      }
      break;
    default:
      return state;
  }
};
