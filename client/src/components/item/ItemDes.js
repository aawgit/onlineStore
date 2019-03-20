import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

class ItemDes extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      _id: "",
      name: "",
      description: "",
      price: "",
      owner: {},
      __v: 0
    }; */
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
     
  }

  onDeleteClick(e) {
    e.preventDefault();
    axios
      .delete("/api/items/" + this.state._id, {
        headers: {
          "x-access-token": JSON.parse(sessionStorage.getItem("user")).jwtToken
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  render() {
    let item = this.props.item;   
    return (
      <div className="col-sm-9 col-md-6 col-lg-5">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">{item.name}</h5>

            <label>{item.description}</label>
            <br />
            <label>
              {" "}
              LKR <span />
              {item.price}
            </label>
            <br />
            <label>
              {" "}
              From <span />
              {item.owner.name}
            </label>
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Contact the seller
            </button>
            <br />
            <div id="edit" />
          
          </div>
        </div>
      </div>
    );
  }
}

function diplayEdit() {

  
}

export default ItemDes;
