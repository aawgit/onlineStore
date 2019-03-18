import React, { Component } from "react";

class ItemPic extends Component {
  render() {
    return (
      <div className="col-sm-9 col-md-6 col-lg-5">
        <div className="card card-signin my-5">
          
            <img
              src={"/images/" + this.props.id + "/img_1.jpeg"}
              className="card-img-top-new"
            />
          </div>
        </div>
      
    );
  }
}

export default ItemPic;
