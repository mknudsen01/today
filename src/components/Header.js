import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render() {
    const { isLoggedIn = false, logout = null } = this.props;
    return (
      <div className="container--full bg--clouds">
        <div className="container">
          <div className="row row--between pv">
            <div className="col--6">
              Today, I...
            </div>
            {
              isLoggedIn && (
                <div className="col--2 col--right">
                  <div className="cursor--pointer" onClick={logout}>Log out</div>
                </div>
              )
            }
          </div>
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
