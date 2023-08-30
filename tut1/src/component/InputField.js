import React  from "react";

const InputField = ({ value, label, name, placeholder, type, onChange,disabled,className,required,pattern,input }) => (
  <>
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      required={required}
      pattern={pattern}
    />
  </>
);

export default InputField;