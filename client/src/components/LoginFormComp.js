import React, { Component } from "react";
import axios from "axios";
import Facebook from "./Facebook";

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
    axios
      .post("/api/auth/login", this.state)
      .then(res => {
        console.log(res);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ jwtToken: res.data.token, userId: res.data.userId, name:res.data.name })
        );
        this.props.setUser(res.data.name);
        this.props.history.push("/");
      })
      .catch(err => console.log(err.response.data));
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <label for="inputEmail" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    name="email"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <label for="inputPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Sign in
                  </button>
                  {/*<button className="btn btn-lg btn-facebook btn-block text-uppercase">
                    <i className="fab fa-google mr-2" /> Sign in with Google
                    </button>*/}
                  <div style={{ textAlign: "center" }}>
                    <p>Or</p>
                    <Facebook
                      history={this.props.history}
                      setUser={this.props.setUser}
                    />
                  </div>
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
