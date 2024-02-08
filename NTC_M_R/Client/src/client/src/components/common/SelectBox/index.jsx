/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';

const SelectBox = ({ ...props }) => {
  const {
    name,
    control,
    label,
    isMulti,
    options,
    rules,
    errors,
    customClass,
    placeholder,
    isClearable // Used to clear the selected dropDown option
  } = props;

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? '#ffffff' : 'black',
      backgroundColor: state.isSelected ? '#4C5C68' : 'white'
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      width: '100%',
      height: '52px',
      borderRadius: '10px',
      border: '2px solid grey',
      margin: '7px auto',
      fontSize: '20px'
    }),
    valueContainer: (defaultStyles) => ({
      ...defaultStyles,
      height: '50px',
      overflow: 'auto'
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#000000' })
  };

  return (
    <div style={{ paddingBottom: '10px' }}>
      <div>{label}</div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ReactSelect
            {...field}
            isMulti={isMulti}
            options={options}
            className={customClass}
            placeholder={placeholder}
            styles={customStyles}
            isClearable={isClearable}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'gray'
              }
            })}
          />
        )}
      />
      {errors && errors[name]?.message && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectBox;
