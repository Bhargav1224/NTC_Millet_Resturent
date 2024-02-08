/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

import cn from 'classnames';
import React from 'react';

const RadioGroup = ({ ...props }) => {
  const {
    name,
    register,
    rules,
    errors,
    customClass,
    options,
    disabled,
    verticalrender,
    label
  } = props;

  const radioCustomStyle = {
    width: '1.15em',
    height: '1.15em',
    border: '0.15em solid gray',
    borderRadius: '50%',
    cursor: disabled && 'not-allowed'
  };

  const contCustomStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 10px 10px 0px',
    cursor: disabled && 'not-allowed'
  };

  return (
    <>
      <div>{label}</div>
      <div className={cn('d-flex', verticalrender ? 'flex-row' : 'flex-column')}>
        {options?.map((item) => (
          <div style={contCustomStyle} key={`${name}_${item.value}`}>
            <input
              style={radioCustomStyle}
              className={customClass}
              type="radio"
              name={name}
              value={item?.value}
              disabled={disabled || item.disabled}
              {...props}
              {...(register && register(name, rules))}
            />
            <span style={{ paddingLeft: '5px' }}>{item?.label}</span>
          </div>
        ))}
      </div>
      {errors && errors[name]?.message && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </>
  );
};

export default RadioGroup;
