import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
    }

    this.loginUser = this.loginUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  loginUser(e) {
    e.preventDefault();

    //do verifications
    const username = this.loginUsername.value;
    const password = this.loginPassword.value;
    this.props.loginUser({username, password});
  }

  createUser(e) {
    e.preventDefault();
    const email = this.createUserEmail.value;
    const password = this.createUserPassword.value;

    this.props.createUser({email, password});
    this.createUserForm.reset();
  }

  toggleLogin(value) {
    this.setState({
      isLogin: value,
    })
  }

  render() {
    const { isLogin } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <Redirect to={'/dashboard'}/>
      )
    }

    const createUserForm = (
      <form
        className="col--12"
        onSubmit={this.createUser}
        ref={(node) => this.createUserForm = node}
      >
        <input
          type="email"
          required
          ref={(node) => this.createUserEmail = node}
          placeholder="email"
          className="pv- ph- col--10"
        />
        <input
          type="password"
          required
          ref={(node) => this.createUserPassword = node}
          placeholder="password"
          className="pv- ph- col--10 mv-"
        />
        <div className="row row--center">
          <div
            className="pv-- ph- bg--peter-river bg--belize-hole--hover text--white transition--3-10 pointer col--3 flex align-items--center justify-content--center"
            onClick={this.createUser}
          >
            Create User
          </div>
        </div>
        <div className="row row--center mt-">
          <div
            className="col--4 font--12 pointer"
            onClick={() => this.toggleLogin(true)}
          >
            Already a user? Log in
          </div>
        </div>
      </form>
    );

    const loginForm = (
      <form
        onSubmit={this.loginUser}
        ref={(node) => this.loginForm = node}
        className="col--12"
      >
        <input
          type="text"
          required
          ref={(node) => this.loginUsername = node}
          placeholder="email"
          className="pv- ph- col--10"
        />
        <input
          type="password"
          required
          ref={(node) => this.loginPassword = node}
          placeholder="password"
          className="pv- ph- col--10 mv-"
        />
        <div className="row row--center">
          <div
            className="pv-- ph- bg--peter-river bg--belize-hole--hover text--white transition--3-10 pointer col--3 flex align-items--center justify-content--center"
            onClick={this.loginUser}
          >
            Log in
          </div>
        </div>
        <div className="row row--center mt-">
          <div
            className="col--4 font--12 pointer"
            onClick={() => this.toggleLogin(false)}
          >
            Not a user? Create an account
          </div>
        </div>
      </form>
    );


    return (
      <div className="container--full bg--wet-asphalt">
        <div className="container">
          <div className="row row--center">
            <div className="col--6">
              <div className="bg--clouds mt++ overflow-x--hidden box-shadow--5">
                <div className="row mv+ pv">
                  {
                    isLogin && loginForm
                  }
                  {
                    !isLogin && createUserForm
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
