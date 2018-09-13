import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Moment from 'react-moment';

import SurveyChart from './SurveyChart';

class SurveyList extends Component {
  componentDidMount = () => {
    this.props.getSurveys();
  };

  renderSurveys = () => {
    return this.props.surveys.reverse().map(survey => {
      const total = survey.yes + survey.no;
      const data = [
        { name: 'Yes', value: survey.yes },
        { name: 'No', value: survey.no },
      ];
      return (
        <div key={survey._id} className="col s12">
          <div className="card teal darken-1 white-text">
            <div
              className="card-image right"
              style={{ margin: '.5rem 5rem 0 0' }}
            >
              {total === 0 ? 'No responses yet.' : <SurveyChart data={data} />}
            </div>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
            </div>
            <div className="card-action">
              <a>Sent on {new Date(survey.dateSent).toLocaleDateString()}</a>
              {survey.lastResponded && (
                <a>
                  Last response received{' '}
                  <Moment fromNow>{survey.lastResponded}</Moment>
                </a>
              )}
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="row">{this.renderSurveys()} </div>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys,
});

export default connect(
  mapStateToProps,
  actions
)(SurveyList);
