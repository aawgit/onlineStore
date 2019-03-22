import React, { Component } from "react";
import LoginFormComp from "../components/LoginFormComp"
 
class Login extends Component {
  render() {
    return (
      <div>
        <LoginFormComp history={this.props.history} setUser={this.props.setUser}/>
      </div>
    );
  }
}
 
export default Login;
