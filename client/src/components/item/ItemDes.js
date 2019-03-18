import React, { Component } from "react";
import axios from "axios";

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
  }
  componentDidMount() {
    var self = this;
    axios
      .get("api/items/" + this.props.id)
      .then(function(res) {
        self.setState({ itemDesc: res.data });
      })
      .catch(function(err) {
        console.log(err);
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
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDes;
