/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved  */
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './LoginForm.module.scss';
import WelcomeSidebar from '../WelcomeSidebar';
import TextField from '../common/TextField';

function LoginForm(props) {
  const {
    register,
    handleSubmit,
    errors
  } = props;

  return (
    <div className={cn('row m-0 vh-100', styles.bgGray)}>
      <WelcomeSidebar />
      <div className="col-md-4 bg-welcome-gray m-auto">
        <div className="card-wrapper">
          <div className="card fat no-border bg-transparent">
            <div className="card-body p-4">
              <div data-testid="title" className="fs-45 fw-700 mb-4">Login</div>
              {/* <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg" */}
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <TextField
                    name="username"
                    type="email"
                    placeholder="Enter Email"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="row">
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="text-end">
                  <Link
                    to="/forgotpassword"
                    className="float-right redBgClr"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="row">
                  <input className={styles.loginBtn} type="submit" />
                </div>
                <div className="margin-top20 text-center">
                  Donot have an account?
                  <Link className="ml-1" to="/register">
                    Create One
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
