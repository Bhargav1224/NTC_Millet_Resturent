import React from 'react';
import { useForm } from 'react-hook-form';

const Input = ({ label, register, required }) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
);

function TextInput(props) {
  const {
    label,
    required,
    pattern,
    maxLength,
    minLength,
    id,
    defaultValue,
    disabled,
    type,
    variant,
    size,
    multiline,
    maxRows,
    placeholder,
    displayLabel,
    autoComplete,
    // color,
    errorLabel
  } = props;
  const { register } = useForm();
  return (
    <Input
      label={label}
      register={register}
      required
      pattern={pattern}
      maxLength={maxLength}
      minLength={minLength} />
  )
}

export default TextInput