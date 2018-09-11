import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields = () =>
    formFields.map(({ label, name }) => (
      <Field
        key={name}
        type="text"
        component={SurveyField}
        label={label}
        name={name}
      />
    ));

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="waves-effect waves-light btn red left">
          Cancel
        </Link>
        <button type="submit" className="waves-effect waves-light btn right">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  formFields.forEach(({ name }) => {
    if (!values[name]) errors[name] = `You must provide a value`;
  });

  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
