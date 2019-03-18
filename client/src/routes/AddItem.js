import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import AddItemComp from "../components/item/AddItemComp";
import LoginHandler from "../_helper/LogInHandler";

class AddItem extends Component {
  render() {
    if (LoginHandler.checkLoggedIn()) {
      return (
        <div>
          <AddItemComp history={this.props.history} />
        </div>
      );
    }
    else{
        return <Redirect to={{pathname:"/"}}></Redirect>
    }
  }
}

export default AddItem;
