import React from 'react';
import { Route } from 'react-router-dom';

const PropRoute = ({ component: Component, match, location, history, ...rest }) => (
  <Route match={match} location={location} history={history} render={() => (
    <Component match={match} location={location} history={history} {...rest}/>
  )}/>
)

export default PropRoute;
