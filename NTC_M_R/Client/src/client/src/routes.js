import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import NotFound from './components/404NotFound';
// import Loadable from 'react-loadable';
// import PageLoader from '@components/common/PageLoader';
// import OnRouteChange from '@containers/common/OnRouteChange';
// import { APP_CONFIG } from './';

// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => (typeof window.localStorage.getItem('userData') !== 'undefined'
//         && window.localStorage.getItem('userData') !== null
//         && window.localStorage.getItem('userData') !== '' ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         ))
//       }
//     />
//   );
// };

// const LoadingComponent = ({ isLoading, isError }) => {
//   if (isLoading) {
//     return <PageLoader />;
//   }
//   if (isError) {
//     return (
//       <div>
//         Sorry, unable to load the page
//       </div>
//     );
//   }
//   return null;
// };

// const Login = Loadable({
//   loader: () => import('@containers/Login'),
//   loading: LoadingComponent,
// });

// const Register = Loadable({
//   loader: () => import('@containers/Register'),
//   loading: LoadingComponent,
// });

// const ForgotPassword = Loadable({
//   loader: () => import('@components/ForgotPassword'),
//   loading: LoadingComponent,
// });

// const notFound = Loadable({
//   loader: () => import('@components/404NotFound'),
//   loading: LoadingComponent,
// });

export default (
  <Router>
    {/* <OnRouteChange> */}
    <div className="container-fluid p-0">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    {/* </OnRouteChange> */}
  </Router>
);
