import React, { Component } from "react";
import axios from "axios";

class LoginFormComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onValuChange = this.onValuChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValuChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    
    axios
      .post("/api/auth/login", this.state)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                <form class="form-signin" onSubmit={this.onSubmit}>
                  <label for="inputEmail" class="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    name="email"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <label for="inputPassword" class="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <button class="btn btn-lg btn-facebook btn-block text-uppercase">
                    <i class="fab fa-google mr-2" /> Sign in with Google
                  </button>
                  <button
                    class="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-facebook-f mr-2" /> Sign in with Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginFormComp;
