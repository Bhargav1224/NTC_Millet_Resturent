/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import WelcomeSidebar from '../WelcomeSidebar';
import styles from './RegisterForm.module.scss';
import TextField from '../common/TextField';
import Checkbox from '../common/CheckBox';

function RegistrationForm(props) {
  const {
    register,
    handleSubmit,
    errors
  } = props;

  return (
    <div className={cn('row m-0 vh-100 bg-welcome-gray', styles.bgGray)}>
      <WelcomeSidebar />
      <div className={cn('col-4 bg-welcome-gray m-auto', styles.signupFormContainer)}>
        <div className="card-wrapper">
          <div className="card fat no-border bg-transparent">
            <div className="card-body">
              <h1 className="fs-45 fw-700 mb-4">Sign up</h1>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className={cn('col-xs-12 col-sm-6 col-md-6 mb-4')}>
                    <TextField
                      name="firstName"
                      type="Text"
                      placeholder="Enter first name"
                      errors={errors}
                      register={register}
                    />
                  </div>
                  <div className={cn('col-xs-12 col-sm-6 col-md-6')}>
                    <TextField
                      name="lastName"
                      type="Text"
                      placeholder="Enter last name"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className={cn('row mb-4')}>
                  <TextField
                    name="username"
                    type="email"
                    placeholder="Enter email"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className={cn('row mb-4')}>
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="row mb-4">
                  <Checkbox name="checkbox" label="I agree to terms and conditions" register={register} errors={errors} />
                </div>
                <div className="row mb-2">
                  <input className={cn(styles.loginBtn)} type="submit" />
                </div>
                <div className="margin-top20 text-center">
                  Already have an account?
                  <Link className="ml-1" to="/login">
                    Login
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

export default RegistrationForm;
