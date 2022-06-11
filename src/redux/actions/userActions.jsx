import axios from 'axios';
import Cookies from 'universal-cookie';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USER_ROL = 'UPDATE_USER_ROL';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const ERROR = 'ERROR';
const baseURL = process.env.REACT_APP_API || "http://localhost:3001";
// Habilitada
export const getUsers = () => async (dispatch) => {
  // console.log(`${baseURL}`);
  await axios.get(`${baseURL}/usuarios`).then(
    (response) => {
      dispatch({
        type: GET_USERS,
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
export const getUser = ( {email, token} ) => async ( dispatch ) => {  
  await axios.get(`${baseURL}/usuario/email/${email}`, 
  { headers: {"Authorization" : `Bearer ${token}`} })
  .then(
    (response) => {
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  )
}

// Habilitada
export const createUser = ({
  name, lastName, picture, born, dni, email, address, province, phone, postal, password,sendAddress, permission = 'user',
}) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario`, {
    name,
    lastName,
    picture,
    born,
    dni,
    email,
    address,
    province,
    phone,
    postal,
    password,
    sendAddress,
    permission,
  }).then(
    (response) => {
      dispatch({
        type: CREATE_USER,
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

//Habilitada
export const updateUser = ({
  name, lastName, picture, born, dni, email, address, province, phone, postal,sendAddress, token 
}) => async (dispatch) => {
  console.log(token, 'action')
  await axios.put(`${baseURL}/usuario`, {
    name,
    lastName,
    picture,
    born,
    dni,
    email,
    address,
    province,
    phone,
    postal,
    sendAddress,

  },
  {headers: {'Authorization': 'Bearer ' + token}}
  ).then(
    (response) => {
      dispatch({
        type: UPDATE_USER,
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

//Habilitada
export const forgotPassword = ({
  email
}) => async (dispatch) => {
  await axios.post(`${baseURL}/usuario/forgotpassword`, {
    email,
  }).then(
    (response) => {
      dispatch({
        type: FORGOT_PASSWORD,
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

//Habilitada
export const updatePassword = ({
  email, password, token 
}) => async (dispatch) => {
  await axios.put(`${baseURL}/usuario/password`, {
    email,
    password
  },
  {headers: {'Authorization': 'Bearer ' + token}}
 
  ).then(
    (response) => {
      dispatch({
        type: UPDATE_PASSWORD,
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




//Habilitada
export const userLogin = ({ email, password}) => async (dispatch) => {
const cookies = new Cookies();
  axios.post(`${baseURL}/usuario/login`,{
      email,
      password,
  }).then( response => {
    cookies.set('user', response.data, { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
      dispatch({
          type: USER_LOGIN,
          payload: response.data
      })
  },
  (error) => {
      dispatch({
          type: ERROR,
          payload: "Usuario o contraseña incorrecta"
      })
  }
  )
}
//Habilitada
export const updateRol = ({
  email,
  permission,
  token 
}) => async (dispatch) => {
  await axios.put(`${baseURL}/usuario/rol`, { email, permission }, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
 }).then(
    (response) => {
      dispatch({
        type: UPDATE_USER_ROL,
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

//Habilitada
export const userLogout = ({
  tokenSession 
}) => async (dispatch) => {
  const cookies = new Cookies();
  await axios.post(`${baseURL}/usuario/logout`, {email: cookies.get('user').email}, {
    headers: {
      'Authorization': 'Bearer ' + tokenSession
    }
 }).then(
    (response) => {
    cookies.remove('user');
    localStorage.clear()
      dispatch({
        type: USER_LOGOUT,
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