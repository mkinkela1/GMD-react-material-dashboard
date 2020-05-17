import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getIsAuthenticated} from '../../store/reducers/AuthReducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import setAuth from '../../store/setters/SetAuth';
import {TOKEN} from '../../constants/AuthConstants';
import store from '../../store';
import auth from '../../store/actions/AuthAction';

const RouteWithLayout = props => {

  const { layout: Layout, component: Component, privateRoute, ...rest } = props;

  if(privateRoute) {
    if(props.isAuthenticated)
      return (
        <Route
          {...rest}
          render={matchProps => (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          )}
        />
      );
    else
      return (
        <Redirect to="/sign-in" />
      );
  }

  else {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    );
  }
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  privateRoute: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  authentication: setAuth
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithLayout);

