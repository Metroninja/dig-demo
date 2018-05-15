export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = ({products, notes}) => {
  return (dispatch) => dispatch({ type: SET_PRODUCTS, products, notes });
};
