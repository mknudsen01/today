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
      <div className="container--full bg--wet-asphalt">
        <div className="container">
          <div className="row row--center">
            <div className="col--6">
              <div className="bg--clouds mt++ overflow-x--hidden box-shadow--5">
                <div className="row mv+ pv">
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
                  </form>
                </div>
                <div className="row row--center mv+">
                  <form
                    onSubmit={this.loginUser}
                    ref={(node) => this.loginForm = node}
                    className="col--12"
                  >
                    <input
                      type="email"
                      required
                      ref={(node) => this.loginEmail = node}
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
                  </form>
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
