import React, { Component } from 'react';
import {BrowserRouter, Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import {TOKEN} from './constants/AuthConstants';
import store from './store';
import auth from './store/actions/AuthAction';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {

  componentWillMount() {

    if(localStorage.getItem(TOKEN))
      store.dispatch(auth(true));
    else store.dispatch(auth(false));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Router>
      </ThemeProvider>
    );
  }
}
