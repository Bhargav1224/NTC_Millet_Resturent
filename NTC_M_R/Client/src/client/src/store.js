import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { emptySplitApi } from './reducers/middleware/mainReducer';
import notificationSlice from './reducers/applicationSlice';

export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptySplitApi.middleware)
});

setupListeners(store.dispatch);

export default store;
// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
// import ApiClient from './helpers/ApiClient';
// import createMiddleware from '@reducers/middleware/clientMiddleware';
// import rootReducer from '@reducers';
// // const createHistory = require('history').createBrowserHistory;
// import { createBrowserHistory } from "history";

// export const history = createBrowserHistory();

// const client = new ApiClient();
// const initialState = {};
// const enhancers = [];
// const middleware = [
//   createMiddleware(client),
//   thunk,
//   routerMiddleware(history)
// ];

// if (process.env.NODE_ENV === 'development') {
//   const devToolsExtension = window.devToolsExtension;

//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }

// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers
// );

// const store = createStore(
//   rootReducer,
//   initialState,
//   composedEnhancers
// );

// export default store;
