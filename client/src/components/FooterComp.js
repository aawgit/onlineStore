import React from "react";
import { NavLink } from "react-router-dom";

class FooterComp extends React.Component {
  render() {
    return (
      <div>
        <footer className="text-muted">
          <div className="container">
            <p className="float-right">
              <a href="#">Back to top</a>
            </p>
            <p>
              Develped by &copy; AW
            </p>

          </div>
        </footer>
      </div>
    );
  }
}
export default FooterComp;
