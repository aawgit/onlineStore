import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditItemComp from "../components/item/EditItemComp";
import LoginHandler from "../_helper/LogInHandler";

class AddItem extends Component {
  render() {
    if (LoginHandler.checkLoggedIn()) {
      return (
        <div>
          <EditItemComp history={this.props.history} itemId={this.props.match.params.id} />
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }
}

export default AddItem;
