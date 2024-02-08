import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/scss/index.scss';
// import App from './App'
import { Provider } from 'react-redux';
import { store } from './store';
import routes from './routes';
import './styles/scss/global.scss';
// import * as serviceWorker from './serviceWorkerRegister';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {routes}
  </Provider>
);
// serviceWorker.register();
