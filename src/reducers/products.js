import { AsyncStorage } from 'react-native';
import * as Actions from '../actions/products';

const initialState = {
  list: [],
  notes: {},
  error: '',
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_NOTE:
      // first lets get the notes so we can push onto it
      const productNotes = state.notes[action.note.id] || [];
      productNotes.push(action.note.value);
      // to avoid mutating the state directly create a shallow copy
      const notes = {
        ...state.notes
      };
      //override the array of notes for a given id
      notes[action.note.id] = productNotes;
      // update our async Storage
      AsyncStorage.setItem('@DIG_Demo:notes', JSON.stringify(notes));
      return {
        ...state,
        notes
      }
    case Actions.GET_PRODUCTS:
      return {
        ...state,
        notes: action.notes || {},
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
