import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ERROR = 'ERROR';
export const GET_MOST_SELL = 'GET_MOST_SELL';
/*****
 * FILTROS
 *****/
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

// Habilitada
export const getProducts = () => async (dispatch) => {
  await axios.get('http://localhost:3001/productos').then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// No Habilitada
export const getProduct = (id) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/id/${id}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCT,
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

export const createProduct = ({ name, description, stock_by_size, price, discount, image, brand, disabled, category, token}) => async (dispatch) => {

  await axios.post('http://localhost:3001/productos', {
    name,
    description,
    stock_by_size,
    price,
    discount,
    image,
    brand,
    disabled,
    category,
    
  },
  {headers: {
    'Authorization': 'Bearer ' + token
  }}
  ).then((response) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data,
    });
  });
};


// No Habilitada
export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/producto/${id}`).then(
    (response) => {
      dispatch({
        type: DELETE_PRODUCT,
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
export const editProduct = (sendData, {token}) => async (dispatch) => {
  
  await axios.put('http://localhost:3001/productos/putproduct', sendData, {headers: {
    'Authorization': 'Bearer ' + token
  }}).then(
      (response) => {
        dispatch({
          type: EDIT_PRODUCT,
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


// FILTROS:

// Prueba...
//export const getProductsbyName = (name) => async (dispatch) => {
//  await axios.get(`http://localhost:3001/productos/name/${name}`).then(
//    (response) => {
//      dispatch({
//        type: GET_PRODUCTS,
//        payload: response.data,
//      });
//    },
//    (error) => {
//      dispatch({
//        type: ERROR,
//        payload: error.error,
//      });
//    },
//  );
//};

export function getProductsbyName(payload) {
  return async function (dispatch) {
      try {
          dispatch ({
              type: FILTER_BY_NAME,
              payload,
          });
      }
      catch (error) {
      }    
  }
}

// Prueba...
export const getProductsbyBrand = (brand) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/marca/${brand}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
// Usar ASC O DESC en order
export const getProductsbyPrice = (order) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/price/${order}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
export const getProductsbyCategory = (category) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/categoria/${category}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
export const getDiscounts = () => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/discount`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Usando...
export const getMostSell = (cateory) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/sell`).then(
    (response) => {
      dispatch({
        type: GET_MOST_SELL,
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
