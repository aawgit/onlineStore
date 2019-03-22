import React, { Component } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";

class Facebook extends Component {
  state = {
    isLoggedIn: false,
    name: "",
    email: "",
    picture: ""
  };
  responseFacebook = response => {
    this.setState({
        isLoggedIn: true,
        name: response.name,
        email: response.name,
        picture: response.picture.data.url 
    });
  };
  componentClicked = {};

  render() {
    let fbContent;
    fbContent = (
      <FacebookLogin
        appId="129047940440558"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
      />
    );
    return <div>{fbContent}</div>;
  }
}

export default Facebook;
