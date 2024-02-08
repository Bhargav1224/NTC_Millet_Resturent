export const REGISTRATION_REQUESTED = 'registration/REGISTRATION_REQUESTED';
export const REGISTRATION_SUCCESS = 'registration/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'registration/REGISTRATION_FAILURE';

export const LOGIN_REQUESTED = 'registration/LOGIN_REQUESTED';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  successLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    case REGISTRATION_FAILURE: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    case LOGIN_REQUESTED: {
      return {
        ...state,
        successLogin: true
      };
    }
    default:
      return state;
  }
};

export const register = (data) => {
  const headers = { has_auth_token: 0 };
  return {
    types: [REGISTRATION_REQUESTED, REGISTRATION_SUCCESS, REGISTRATION_FAILURE],
    promise: (client) => client.post('register', {
      headers,
      data
    })
  };
};

export const login = (payload) => {
  return {
    type: LOGIN_REQUESTED,
    payload
  };
};
