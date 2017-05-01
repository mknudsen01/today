import React, { Component, PropTypes } from 'react';

import Row from './layout/Row';
import Column from './layout/Column';

import ApiService from '../ApiService';

import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout } = this.props;

    return ApiService.post('/logout')
      .then(res => logout());
  }

  render() {
    const { isLoggedIn = false } = this.props;
    return (
      <div className="container--full bg--clouds">
        <div className="container">
          <Row between className="pv">
            <Column span={6}>
              {
                isLoggedIn ? (
                  <Link to="/dashboard">Today, I...</Link>
                ) : (
                  <Link to="/login">Today, I...</Link>
                )
              }
            </Column>
            {
              isLoggedIn && (
                <Column span={4} end>
                  <div className="cursor--pointer" onClick={this.logout}>Log out</div>
                </Column>
              )
            }
          </Row>
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
