import React, {Component} from "react";

class NavBarComp extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-auto order-0">
            <a className="navbar-brand mx-auto" href="#">
              Shop
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".dual-collapse2"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            {this.displayNavs()}
          </div>
        </nav>
      </div>
    );
  }
  displayNavs() {
    if (this.props.userName) {
      return (
        <ul className="navbar-nav ml-auto">
          <li>
            <a href="#" className="nav-link">{this.props.userName}</a>
          </li>
          <li>
            <a href="/#/addItem" className="btn btn-success" style={{marginLeft:"4px", marginRight:"4px"}}>Add item</a>
          </li>
          <li>
            <button onClick={this.props.removeUser} className="btn btn-outline-light">
              Sign out
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/register">
              Register
            </a>
          </li>
        </ul>
      );
    }
  }
}

export default NavBarComp;
