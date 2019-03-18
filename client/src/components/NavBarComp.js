import React from "react";
import { NavLink } from "react-router-dom";

class NavBarComp extends React.Component {
  render() {
    return (
      <div>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">About</h4>
                <p className="text-muted">This is an online shop.</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <NavLink to="login"><h4 className="text-white">Sign in</h4></NavLink>                
                <NavLink to="register"><h4 className="text-white">Register</h4></NavLink>
                <h4 className="text-white">Contact</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <h2><strong>Shop</strong></h2>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default NavBarComp;
