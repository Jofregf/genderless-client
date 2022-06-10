import { GET_USERS, GET_USER, CREATE_USER, UPDATE_USER, UPDATE_PASSWORD, USER_LOGIN, USER_LOGOUT, UPDATE_USER_ROL, ERROR, FORGOT_PASSWORD } from '../actions/userActions';

const initialState = {
  usuarios: [],
  status: '',
  usuario: {},
  token: ''
};
function userReducer( state = initialState, action) {
  // console.log('action.payload user', action.payload)
  switch (action.type) {
    case GET_USERS:
      return { ...state, usuarios: action.payload };
    case GET_USER:
      return { ...state, usuario: action.payload };
    case CREATE_USER:
      return { ...state, status: action.payload };
    case UPDATE_USER:
      return { ...state, status: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, status: action.payload };
    case USER_LOGIN:
      return { ...state, status: action.payload, usuario: action.payload || null, token: action.payload?.tokenSession || null };
    case USER_LOGOUT:
      return { ...state, status: action.payload, usuario: action.payload || null, token: action.payload?.tokenSession || null };
    case UPDATE_USER_ROL:
      return { ...state, status: action.payload };
    case FORGOT_PASSWORD:
      return { ...state, status: action.payload };
    case ERROR:
      return { ...state, status: action.payload };
    default:
      return { ...state };
  }
}
export default userReducer;
