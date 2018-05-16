export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

export const ADD_NOTE = "ADD_NOTE";


export const getProducts = ({notes}) => {
  return async (dispatch) =>  {
    dispatch({ type: GET_PRODUCTS, notes });
    try {
      const response = await fetch('https://private-5815fe-recommendationsknip.apiary-mock.com/products');
      const result = await response.json();
      dispatch({type: GET_PRODUCTS_SUCCESS, result});
    } catch (exception) {
      dispatch({type: GET_PRODUCTS_FAILURE, exception})
    }
  }
};

export const addNote = (note) => {
  return (dispatch) => dispatch({type: ADD_NOTE, note});
}
