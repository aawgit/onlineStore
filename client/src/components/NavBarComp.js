import React from "react";
import { NavLink } from "react-router-dom";

class NavBarComp extends React.Component {
  render() {
    return (
      <div>
        <div class="collapse bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4 class="text-white">About</h4>
                <p class="text-muted">This is an online shop.</p>
              </div>
              <div class="col-sm-4 offset-md-1 py-4">
                <NavLink to="login"><h4 class="text-white">Sign in</h4></NavLink>                
                <NavLink to="register"><h4 class="text-white">Register</h4></NavLink>
                <h4 class="text-white">Contact</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
              <h2><strong>Shop</strong></h2>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default NavBarComp;
