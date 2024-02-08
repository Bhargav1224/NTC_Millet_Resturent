/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ ...props }) => {
  const {
    name,
    control,
    label,
    rules,
    errors,
    dateFormat,
    showTimeSelectOnly,
    showTimeSelect,
    customClass,
    disabled,
    placeholder,
    timeIntervals,
    minDate,
    maxDate
  } = props;

  const customStyings = {
    width: '100%',
    height: '52px',
    borderRadius: '10px',
    border: '2px solid grey',
    margin: '7px auto',
    fontSize: '20px',
    background: disabled && '#e1e6ea',
    cursor: disabled && 'not-allowed'
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomInput = (propsDate) => (
    <input style={customStyings} {...propsDate} />
  );

  return (
    <div style={{ paddingBottom: '10px' }}>
      <div>{label}</div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <DatePicker
              {...field}
              selected={field?.value}
              name={name}
              className={customClass}
              placeholderText={placeholder}
              showTimeSelect={showTimeSelect || showTimeSelectOnly}
              showTimeSelectOnly={showTimeSelectOnly}
              timeIntervals={timeIntervals}
              minDate={minDate}
              maxDate={maxDate}
              // eslint-disable-next-line react/jsx-boolean-value
              closeOnScroll={true}
              isClearable
              disabled={disabled}
              dateFormat={dateFormat || 'MM/dd/yyyy'}
              customInput={<CustomInput />}
            />
          </div>
        )}
      />
      {errors && errors[name]?.message && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DateTimePicker;
