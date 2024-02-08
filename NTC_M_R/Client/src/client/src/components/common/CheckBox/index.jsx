/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

const Checkbox = ({ ...props }) => {
  const {
    name,
    register,
    rules,
    label,
    errors,
    customClass,
    disabled
  } = props;

  const checkboxCustomStyle = {
    width: '1.15em',
    height: '1.15em',
    border: '0.15em solid gray',
    cursor: disabled && 'not-allowed'
  };

  const contCustomStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: disabled && 'not-allowed',
    paddingBottom: '10px'
  };

  return (
    <>
      <div style={contCustomStyle}>
        <input
          style={checkboxCustomStyle}
          type="checkbox"
          name={name}
          className={customClass}
          {...props}
          {...(register && register(name, rules))}
        />
        {label && <span style={{ paddingLeft: '5px' }}>{label}</span>}
      </div>
      {errors && errors[name]?.message && (
        <div className="text-danger">{errors[name].message}</div>
      )}
    </>
  );
};

export default Checkbox;
