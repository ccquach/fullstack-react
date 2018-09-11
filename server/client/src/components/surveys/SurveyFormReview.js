import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => (
    <li key={name} className="collection-item">
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </li>
  ));

  return (
    <div>
      <ul className="collection with-header section">
        <li className="collection-header">
          <h5>Please confirm your entries:</h5>
        </li>
        {reviewFields}
      </ul>
      <button
        className="waves-effect waves-light btn yellow darken-3 left"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="waves-effect waves-light btn green right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values,
});

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(SurveyFormReview)
);
