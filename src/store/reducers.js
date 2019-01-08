export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAIL = "LOGIN_REQUEST_FAIL";

export const LOGOUT = "LOGOUT";

export const LAYOUTS_REQUEST = "LAYOUTS_REQUEST";
export const LAYOUTS_REQUEST_SUCCESS = "LAYOUTS_REQUEST_SUCCESS";
export const LAYOUTS_REQUEST_FAIL = "LAYOUTS_REQUEST_FAIL";

const initialState = {
  userContext: {},
  layouts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loadingLogin: true };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loadingLogin: false,
        userContext: action.payload.data[0]
      };
    case LOGIN_REQUEST_FAIL:
      return { ...state, loadingLogin: false, error: "Cant fetch user" };
    case LOGOUT:
      return { ...state, userContext: {} };
    case LAYOUTS_REQUEST:
      return { ...state, loadingLayouts: true };
    case LAYOUTS_REQUEST_SUCCESS:
      console.log(action.payload.data);
      return { ...state, loadingLayouts: false, layouts: action.payload.data };
    case LAYOUTS_REQUEST_FAIL:
      return { ...state, loadingLayouts: false, error: "Cant fetch layouts" };
    default:
      return state;
  }
};

export const login = ({ username, password }) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      request: {
        url: `/users?q=${username}`
      }
    }
  };
};
export const getLayouts = () => {
  return {
    type: LAYOUTS_REQUEST,
    payload: {
      request: {
        url: "/layouts"
      }
    }
  };
};

export const hydrateUserContext = payload => {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: {
      data: payload
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
export default reducer;
