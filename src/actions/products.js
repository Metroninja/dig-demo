export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

export const ADD_COMMENT = "ADD_COMMENT";


export const getProducts = ({comments}) => {
  return async (dispatch) =>  {
    dispatch({ type: GET_PRODUCTS, comments });
    try {
      const response = await fetch('https://private-5815fe-recommendationsknip.apiary-mock.com/products');
      const result = await response.json();
      dispatch({type: GET_PRODUCTS_SUCCESS, result});
    } catch (exception) {
      dispatch({type: GET_PRODUCTS_FAILURE, exception})
    }
  }
};

export const addComment = (comment) => {
  return (dispatch) => dispatch({type: ADD_COMMENT, comment});
}
