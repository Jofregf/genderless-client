import axios from 'axios';


export const ADD_PRODUCT = 'ADD_PRODUCT'
export const GET_SHOPPING = 'GET_SHOPPING'
export const RETURN_PRODUCT = 'RETURN_PRODUCT'
export const EMPTY_SHOPPING = 'EMPTY_SHOPPING'
export const TOTAL_SHOPPING = 'TOTAL_SHOPPING'
export const TOTAL_DELETE_SHOPPING = 'TOTAL_DELETE_SHOPPING'
export const STATE_NAVBAR = 'STATE_NAVBAR'
export const ERROR = 'ERROR';
const baseURL = process.env.REACT_APP_API || "http://localhost:3001";
// Habilitada
export const addProduct = ( {email, productId, productSize, productQuantity} ) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario/shoppingcart`, { email, productId, productSize, productQuantity }).then(
    (response) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const putProduct = ( {email, productId, productQuantity} ) => async (dispatch) => {
  await axios.put(`${baseURL}/usuario/shoppingcart`, { email, productId, productQuantity }).then(
    (response) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const getShopping = ( {email} ) => async (dispatch) => {
  await axios.get(`${baseURL}/usuario/shoppingcart/${email}`).then(
    (response) => {
      dispatch({
        type: GET_SHOPPING,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const returnProduct = ( {email, productId} ) => async (dispatch) => {
  await axios.delete(`${baseURL}/usuario/shoppingcart/${email}/${productId}`).then(
    (response) => {
      dispatch({
        type: RETURN_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const emptyShopping = ( {email} ) => async (dispatch) => {
  await axios.delete(`${baseURL}/usuario/deleteshoppingcart/${email}`).then(
    (response) => {
      dispatch({
        type: EMPTY_SHOPPING,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

export const totalShopping = ( data ) => (dispatch) => {
      dispatch({
        type: TOTAL_SHOPPING,
        payload: data,
      });
    }

export const totalDeleteShopping = ( index ) => (dispatch) => {
      dispatch({
        type: TOTAL_DELETE_SHOPPING,
        payload: index,
      });
    }

export const stateNav = () => (dispatch) => {
      dispatch({
        type: STATE_NAVBAR,
      });
    }
