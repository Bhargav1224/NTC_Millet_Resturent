/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegistrationForm from '../../components/RegisterForm';

function Register() {
  const schema = yup.object({
    firstName: yup.string().required('Firstname is required').nullable(),
    lastName: yup.string().required('Lastname is required').nullable(),
    username: yup.string().email('Enter valid emailId').required('Email is required').nullable(),
    password: yup.string().required('Password is required').nullable(),
    checkbox: yup.boolean().nullable()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <RegistrationForm
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
}

export default Register;
