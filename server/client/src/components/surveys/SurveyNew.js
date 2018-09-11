import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showFormReview: false,
  };

  showFormReview = () => this.setState({ showFormReview: true });

  hideFormReview = () => this.setState({ showFormReview: false });

  renderContent = () => {
    if (this.state.showFormReview)
      return <SurveyFormReview onCancel={this.hideFormReview} />;
    return <SurveyForm onSurveySubmit={this.showFormReview} />;
  };

  render() {
    return this.renderContent();
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
