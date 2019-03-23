import React, { Component } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

class Facebook extends Component {
  state = {
    isLoggedIn: false,
    name: "",
    email: "",
    picture: "",
    accessToken: ""
  };
  onLoginSuccess() {
    axios
      .post("/api/auth/facebook/login", {
        access_token: this.state.accessToken
      })
      .then(res => {
        console.log(res);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ jwtToken: res.data.token, userId: res.data.userId })
        );
        this.props.setUser(res.data.name);
        this.props.history.push("/");
      })
      .catch(err => console.log(err.response.data));
  }
  responseFacebook = response => {
    if (response.accessToken) {
      this.setState({
        isLoggedIn: true,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        accessToken: response.accessToken
      });
      console.log(response);
      this.onLoginSuccess();
    }
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
