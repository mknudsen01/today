import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPassword.value;

    this.props.loginUser({email, password});
  }

  createUser(e) {
    e.preventDefault();
    const email = this.createUserEmail.value;
    const password = this.createUserPassword.value;

    this.props.createUser({email, password});
    this.createUserForm.reset();
  }

  render() {
    return (
      <div className="container--full">
        <div className="container">
          <div className="row row--center">
            <form
              onSubmit={this.createUser}
              ref={(node) => this.createUserForm = node}
            >
              <input
                type="email"
                required
                ref={(node) => this.createUserEmail = node}
                placeholder="email"
                className="pv- ph-"
              />
              <input
                type="password"
                required
                ref={(node) => this.createUserPassword = node}
                placeholder="password"
                className="pv- ph-"
              />
              <button type="submit">Create User</button>
            </form>
          </div>
          <div className="row row--center mt+">
            <form
              onSubmit={this.loginUser}
              ref={(node) => this.loginForm = node}
            >
              <input
                type="email"
                required
                ref={(node) => this.loginEmail = node}
                placeholder="email"
                className="pv- ph-"
              />
              <input
                type="password"
                required
                ref={(node) => this.loginPassword = node}
                placeholder="password"
                className="pv- ph-"
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
