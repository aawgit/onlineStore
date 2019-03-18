import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

class ItemDes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDesc: {
        _id: "",
        name: "",
        description: "",
        price: "",
        owner: {},
        __v: 0
      }
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get("api/items/" + this.props.id)
      .then(function(res) {
        self.setState({ itemDesc: res.data });
        console.log(JSON.parse(sessionStorage.getItem("user")).userId);
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
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  onDeleteClick(e) {
    e.preventDefault();
    axios
      .delete("/api/items/"+this.state.itemDesc._id, {
        headers: { "x-access-token": JSON.parse(sessionStorage.getItem("user")).jwtToken }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  render() {
    let itemDesc = this.state.itemDesc;
    return (
      <div className="col-sm-9 col-md-6 col-lg-5">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">{itemDesc.name}</h5>

            <label>{itemDesc.description}</label>
            <br />
            <label>
              {" "}
              LKR <span />
              {itemDesc.price}
            </label>
            <br />
            <label>
              {" "}
              From <span />
              {itemDesc.owner.name}
            </label>
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Contact the seller
            </button>
            <br />
            <div id="delete" />
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDes;
