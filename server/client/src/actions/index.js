import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

const fetchUser = res => ({
  type: FETCH_USER,
  payload: res.data,
});

const fetchSurveys = res => ({
  type: FETCH_SURVEYS,
  payload: res.data,
});

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch(fetchUser(res));
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch(fetchUser(res));
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  dispatch(fetchUser(res));
  history.push('/surveys');
};

export const getSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch(fetchSurveys(res));
};
