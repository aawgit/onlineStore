import React, { Component } from "react";
import axios from "axios";
import { request } from "https";
import ReactDOM from "react-dom";

class RegisterFormComp extends Component {
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
    var message = "";
    e.preventDefault();

    let newUser = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/auth/register", newUser)
      .then(res => {
        console.log(res);

        message = `Verification e-mail has been sent to ${res.data}.`;
        ReactDOM.render(message, document.getElementById("message"));
        console.log(res.data);
      })
      .catch(err => {
        message = `Oops! There is a problem. ${err.response.data.message}.`;
        ReactDOM.render(message, document.getElementById("message"));
        console.log(err.response.data);
      });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Register</h5>
                <form class="form-signin" onSubmit={this.onSubmit}>
                  <label for="firstName" class="sr-only">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    class="form-control"
                    placeholder="First name"
                    required
                    autofocus
                    onChange={this.onValuChange}
                    name="firstName"
                  />
                  <br />
                  <label for="lastName" class="sr-only">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    class="form-control"
                    placeholder="LastName"
                    required
                    autofocus
                    onChange={this.onValuChange}
                    name="lastName"
                  />
                  <br />
                  <label for="email" class="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    name="email"
                    placeholder="Email address"
                    required
                    autofocus
                    onChange={this.onValuChange}
                  />
                  <br />
                  <label for="password" class="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={this.onValuChange}
                  />
                  <br />

                  <button
                    class="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Register
                  </button>
                  <br />
                  <div id="message" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterFormComp;
