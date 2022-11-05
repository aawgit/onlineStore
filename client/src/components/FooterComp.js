import React from "react";
import { NavLink } from "react-router-dom";

class FooterComp extends React.Component {
  render() {
    return (
      <div>
        <footer className="text-muted">
          <div className="container">
            <p style=
            {
              {
                backgroundColor:"#353A40",borderRadius:"7px",
                width:"120px",
                height:"50px",
                padding:"13px 17px"
              }
            } className="float-right">
              <a style=
                {
                  {
                    color:"white",textDecoration:"none"
                  }
                } href="#">Back to top</a>
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
