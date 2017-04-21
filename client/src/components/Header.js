import React, { Component, PropTypes } from 'react';

import Row from './layout/Row';
import Column from './layout/Column';

class Header extends Component {

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
