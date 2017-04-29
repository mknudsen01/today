import React, { Component, PropTypes } from 'react';

import Row from './layout/Row';
import Column from './layout/Column';

import ApiService from '../ApiService';

class Header extends Component {

  testApi() {
    return ApiService.get('/test')
      .then(res => console.log('res: ', res));
  }

  logoutApi() {
    return ApiService.post('/logout')
      .then(res => console.log('res: ', res));
  }

  authApi() {
    return ApiService.get('/auth')
      .then(res => console.log('res: ', res));
  }

  render() {
    const { isLoggedIn = false, logout = null } = this.props;
    return (
      <div className="container--full bg--clouds">
        <div className="container">
          <Row between className="pv">
            <Column span={6}>
              Today, I...
            </Column>
            {
              isLoggedIn && (
                <Column span={4} end>
                  <div className="cursor--pointer" onClick={logout}>Log out</div>
                </Column>
              )
            }
          </Row>
          <div onClick={this.testApi}>Test api</div>
          <div onClick={this.authApi}>auth api</div>
          <div onClick={this.logoutApi}>logout api</div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func
}

export default Header;
