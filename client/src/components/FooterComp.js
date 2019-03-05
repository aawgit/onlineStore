import React from "react";
import { NavLink } from "react-router-dom";

class FooterComp extends React.Component {
  render() {
    return (
      <div>
        <footer class="text-muted">
          <div class="container">
            <p class="float-right">
              <a href="#">Back to top</a>
            </p>
            <p>
              Develped by &copy; [company name]
            </p>

          </div>
        </footer>
      </div>
    );
  }
}
export default FooterComp;
