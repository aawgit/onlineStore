import React, { Component } from "react";
import ItemPic from "../components/item/ItemPic";
import ItemDes from "../components/item/ItemDes";
import axios from "axios";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { "": "", owner: { name: "", id: "" } };
  }

  componentDidMount() {
    var self = this;
    axios
      .get("api/items/" + this.props.match.params.id)
      .then(function(res) {
        self.setState(res.data);
        //self.setState({owner:{name:"Adam Sandler", id:"some id"}});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.owner.name);
    return (
      <div className="container">
        <div className="row">
          <ItemPic imageLocation={this.state.imageLocation} />

          <ItemDes item={this.state} />
        </div>
      </div>
    );
  }
}

export default Item;
