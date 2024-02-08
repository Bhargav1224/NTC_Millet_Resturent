/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved  */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSubmitFeedbackMutation, useLazyGetPokemonByNameQuery } from '../../reducers/allReducer';
import API_CONFIG from '../../constants/api';
import Notification from '../../components/common/Notification';
import { handleNotificationPanel } from '../../reducers/applicationSlice';
import LoginForm from '../../components/LoginForm';

function Login() {
  const navigate = useNavigate();
  const [trigger] = useLazyGetPokemonByNameQuery();
  const [submitFeedback] = useSubmitFeedbackMutation();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('success');
  const [msgType, setMsgType] = useState('success');

  const schema = yup.object({
    username: yup.string().email('Enter valid emailId').required('Email is required').nullable(),
    password: yup.string().required('Password is required').nullable()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (jsonData) => {
    console.log(jsonData);
    submitFeedback({
      endpoint: `${API_CONFIG.endpoints.oAuth}`,
      data:
      {
        username: jsonData.username,
        password: jsonData.password
      }
    }).then((response) => {
      localStorage.setItem('access_token', response.data.access_token);
      trigger(
        {
          endpoint: API_CONFIG.endpoints.getPostDetailsList,
          filter: {
            pageNo: 1, pageSize: 6, search: '', filterBy: 'live'
          }
        }
      ).then((data) => {
        dispatch(handleNotificationPanel(true));
        setMsg(data.message);
        setMsgType('success');
        navigate('/dashboard');
      }).catch((data) => {
        dispatch(handleNotificationPanel(true));
        setMsg(data.message);
        setMsgType('error');
      });
    }).catch((data) => {
      dispatch(handleNotificationPanel(true));
      setMsg(data.message);
      setMsgType('error');
    });
  };

  return (
    <div className="row m-0 vh-100">
      <LoginForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
      <Notification msg={msg} msgType={msgType} />
    </div>
  );
}

export default Login;
