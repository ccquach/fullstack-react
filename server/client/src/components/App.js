import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyForm = () => <h2>SurveyForm</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyForm} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
