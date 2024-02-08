import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
import otp from './otp';
import oauth from './oauth';
import localization from './localization';
import { register } from './register';
import password from './password';
import ui from './ui';

const appReducer = combineReducers({
  router: routerReducer,
  otp,
  oauth,
  password,
  localization,
  register,
  ui,
  // form: formReducer
});

// Setup root reducer
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
