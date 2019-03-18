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
    console.log(this.state);

    axios
      .post("/api/items", this.state, {
        headers: { "x-access-token": sessionStorage.getItem("jwtToken") }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    /* axios
      .post("/api/items/", this.state)
      .then(res => {
        console.log(res);
        //sessionStorage.setItem("jwtToken", res.data.token);
        //this.props.history.push("/");
      })
      .catch(err => console.log(err.response.data)); */
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Add item</h5>
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <label for="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Item name"
                    required
                    autofocus
                    name="name"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <label for="description" className="sr-only">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    placeholder="Item description"
                    required
                    autofocus
                    name="description"
                    onChange={this.onValuChange}
                  />
                  <br />
                  <label for="price" className="sr-only">
                    Price (LKR)
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="form-control"
                    placeholder="Item price"
                    required
                    autofocus
                    name="price"
                    onChange={this.onValuChange}
                  />
                  <br />

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Add item
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
