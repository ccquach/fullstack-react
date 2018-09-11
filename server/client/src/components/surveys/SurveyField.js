import React from 'react';

const SurveyField = ({
  input,
  type,
  label,
  meta: { touched, error, active },
}) => {
  // invalid styles (red)
  const isValid = touched && error ? 'invalid' : null;
  // active styles (label transitions above input)
  const isActive =
    (!active && !!input.value.length) || active ? 'active' : null;

  const errorMessage = touched && error ? error : null;

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          id={input.name}
          type={type}
          {...input}
          className={`validate ${isValid}`}
        />
        <label htmlFor={input.name} className={isActive}>
          {label}
        </label>
        <span className="helper-text" data-error={errorMessage}>
          &nbsp;
        </span>
      </div>
    </div>
  );
};

export default SurveyField;
