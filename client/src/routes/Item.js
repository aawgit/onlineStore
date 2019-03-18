import React, { Component } from "react";
import ItemPic from "../components/item/ItemPic";
import ItemDes from "../components/item/ItemDes";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { itemId: this.props.match.params.id };
  }

  componentDidMount() {
    //this.setState({ itemId: this.props.match.params.id });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
            
              <ItemPic id={this.state.itemId} />
            
          <ItemDes id={this.state.itemId} />
        </div>
      </div>
    );
  }
}

export default Item;
