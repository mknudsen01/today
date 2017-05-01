import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, match, location, history, isLoggedIn = false, ...rest }) => (
  <Route match={match} location={location} history={history} render={() => (
    isLoggedIn ? (
      <Component match={match} location={location} history={history} {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
