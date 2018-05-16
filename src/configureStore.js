import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/index";


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

//boilerplate with some flow magic
const configureStore = function (initialState: Object = {}): Function {
  const store =  createStoreWithMiddleware(rootReducer, initialState);
  return store;
};

export default configureStore;
