import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    console.log(this.state);
    //console.log(this.state);

    axios
      .put("/api/items/" + this.props.itemId, this.state, {
        headers: {
          "x-access-token": JSON.parse(sessionStorage.getItem("user")).jwtToken
        }
      })
      .then(res => {
        console.log(res);
        this.props.history.push("/viewItem/" + res.data._id);
      })
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

  componentDidMount() {
    var self = this;
    axios
      .get("api/items/" + this.props.itemId)
      .then(function(res) {
        self.setState(res.data);
        console.log(self.state);
       /*  console.log(JSON.parse(sessionStorage.getItem("user")).userId);
        if (
          JSON.parse(sessionStorage.getItem("user")).userId ===
          res.data.owner._id
        ) {
          const deleteButton = (
            <button className="btn btn-lg btn-danger btn-block" onClick={self.onDeleteClick}>
              Delete item
            </button>
          );
          ReactDOM.render(deleteButton, document.getElementById("delete")); 
        }*/
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Edit item</h5>
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
                    value={this.state.name}
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
                    value={this.state.description}
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
                    value={this.state.price}
                  />
                  <br />

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Save changes
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
