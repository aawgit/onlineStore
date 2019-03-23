import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddItemComp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", price: "", file: "" };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e) {
    switch (e.target.name) {
      case "file":
        this.setState({ file: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    const { name, description, price, file } = this.state;
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);
    console.log(this.state);
    axios
      .post("/api/items", formData, {
        headers: {
          "x-access-token": JSON.parse(sessionStorage.getItem("user")).jwtToken
          //"Content-Type": "application/x-www-form-urlencoded"
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

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Add item</h5>
                <form
                  className="form-signin"
                  onSubmit={this.onSubmit}
                  enctype="multipart/form-data"
                >
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
                    onChange={this.onValueChange}
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
                    onChange={this.onValueChange}
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
                    onChange={this.onValueChange}
                  />
                  <br />
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    id="file"
                    onChange={this.onValueChange}
                  />
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

export default AddItemComp;
