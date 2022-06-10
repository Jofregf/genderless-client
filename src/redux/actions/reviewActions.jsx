import axios from 'axios';

export const POST_REVIEW = 'POST_REVIEW';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS';
export const DELETE_REVIEW_BY_ID = 'DELETE_REVIEW_BY_ID';
export const DELETE_USER_REVIEWS = 'DELETE_USER_REVIEWS';
export const ERROR = 'ERROR';


// Habilitada
export const postReview = ({
    email, productTitle, comment, rating, name, lastname, token
}) => async (dispatch) => {
  console.log(token, 'en action')
  await axios.post('http://localhost:3001/usuario/review', {
      email,
      productTitle,
      comment,
      rating,
      name, 
      lastname
  }, {headers: {'Authorization': 'Bearer ' + token}}).then(
    (response) => {
      dispatch({
        type: POST_REVIEW,
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
export const getReviews = ({token}) => async (dispatch) => {
  await axios.get('http://localhost:3001/usuario/reviews', {headers: {'Authorization': 'Bearer ' + token}}).then(
    (response) => {
      dispatch({
        type: GET_REVIEWS,
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

// NO HABILITADA
export const getProductReviews = ({
    productId
}) => async (dispatch) => {
  await axios.get('http://localhost:3001/usuario/review', {
      productId
  }).then(
    (response) => {
      dispatch({
        type: GET_PRODUCT_REVIEWS,
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

// NO HABILITADA
export const deleteUserReview = ({
    email, productId
}) => async (dispatch) => {
  await axios.delete('http://localhost:3001/usuario/review', {
      email,
      productId
  }).then(
    (response) => {
      dispatch({
        type: DELETE_USER_REVIEWS,
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
export const deleteReviewById = ({
    id
}) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/usuario/reviewById/${id}`).then(
    (response) => {
      dispatch({
        type: DELETE_REVIEW_BY_ID,
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

