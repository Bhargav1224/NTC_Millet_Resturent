// import './App.css';
import { Provider } from 'react-redux';
import store from '../../store';

import routes from '../../routes';
// import './include/bootstrap';

function App() {
  return (
    <Provider store={store}>
      <div>
        {routes}
      </div>
    </Provider>
  );
}

export default App;

// import React from 'react';
// import { render } from 'react-dom';
// // import { ConnectedRouter } from 'react-router-redux';

// import store from './store';
// import routes from './routes';

// import './include/bootstrap';

// const target = document.querySelector('#root');

// render(

//   target
// );
