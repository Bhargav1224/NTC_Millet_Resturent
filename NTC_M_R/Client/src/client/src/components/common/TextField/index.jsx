/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const TextField = ({ ...props }) => {
  const {
    name,
    register,
    rules,
    label,
    type,
    placeholder,
    errors,
    customClass,
    min,
    max,
    readOnly,
    defaultValue
  } = props;

  const customStyings = {
    width: '100%',
    height: '52px',
    borderRadius: '10px',
    border: '2px solid grey',
    margin: '7px auto',
    fontSize: '20px',
    background: readOnly && '#e1e6ea',
    cursor: readOnly && 'not-allowed'
  };
  return (
    <div style={{ paddingBottom: '10px' }} aria-live="polite">
      <div>{label}</div>
      <input
        style={customStyings}
        className={customClass}
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        readOnly={readOnly}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
        {...register && register(name, rules)}
      />
      {errors && errors[name]?.message && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextField;
