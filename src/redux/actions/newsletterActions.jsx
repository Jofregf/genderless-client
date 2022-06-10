import axios from 'axios';
import baseURL from '../../index';

export const SUBSCRIBE_NEWSLETTER = 'SUBSCRIBE_NEWSLETTER';
export const SUBSCRIBE_FAVORITES = 'SUBSCRIBE_FAVORITES';
export const UNSUBSCRIBE_NEWSLETTER = 'UNSUBSCRIBE_NEWSLETTER';

export const ERROR = 'ERROR';

// Habilitada
export const subscribeNewsletter = ({
    email
}) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario/newsletter`, {
      email
  }).then(
    (response) => {
      dispatch({
        type: SUBSCRIBE_NEWSLETTER,
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
export const subscribeFavorites = ({
    email
}) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario/newsletterfavorites`, {
      email
  }).then(
    (response) => {
      dispatch({
        type: SUBSCRIBE_FAVORITES,
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
export const unsubscribeNewsletter = ({
    email
}) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario/unsubscribe/${email}`).then(
    (response) => {
      dispatch({
        type: UNSUBSCRIBE_NEWSLETTER,
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



