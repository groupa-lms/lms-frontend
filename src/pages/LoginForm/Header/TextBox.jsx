import React from 'react';

const TextBox = ({
    placeholder,
    prefix,
    errorMessage,
    value,
    onValueChange,
  }) => (<input className="input-text" placeholder={placeholder} prefix={prefix} errormessage={errorMessage} value={value} onChange={({ 
    target: { value }}) => onValueChange(value)} type="text" />);

export default TextBox;