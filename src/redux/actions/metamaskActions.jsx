import axios from 'axios';
import baseURL from '../../index';

export const ADD_META_ORDER = 'ADD_META_ORDER';
export const GET_META_ORDERS = 'GET_META_ORDERS';
export const PUT_META_ORDER = 'PUT_META_ORDER';
export const GET_META_USER_ORDERS = 'GET_META_USER_ORDERS';

export const ERROR = 'ERROR';

// Habilitada
export const addMetaOrder = (
    { payment_id, email, productList, status, status_detail, total, sendAddress }
) => async (dispatch) => {
  await axios.post(`${baseURL}/metamask/order`, {
      payment_id,
      email,
      productList,
      status,
      status_detail,
      total,
      sendAddress
  }).then(
    (response) => {
      dispatch({
        type: ADD_META_ORDER,
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
export const getMetaOrders = () => async (dispatch) => {
  await axios.get(`${baseURL}/metamask/orders`).then(
    (response) => {
      dispatch({
        type: GET_META_ORDERS,
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
export const getMetaUserOrders = (
    { email }
) => async (dispatch) => {
  await axios.get(`${baseURL}/metamask/orders?email=${email}`).then(
    (response) => {
      dispatch({
        type: GET_META_USER_ORDERS,
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
export const putMetaOrder = (
    {payment_id, email, newStatus, statusDetail}
) => async (dispatch) => {
  console.log(payment_id, email, newStatus, statusDetail);
  await axios.put(`${baseURL}/metamask/order`, {
    payment_id, 
    email, 
    newStatus, 
    statusDetail
}).then(
    (response) => {
      dispatch({
        type: PUT_META_ORDER,
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



