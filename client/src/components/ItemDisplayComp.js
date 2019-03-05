import React from "react";
import { NavLink } from "react-router-dom";

class ItemDisplayComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        items: [
          { name: "item 1" },
          { name: "item 2" },
          { name: "item 3" },
          { name: "item 4" }
        ]
      },
      function() {
        console.log(this.state);
      }
    );
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <main role="main">
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {items.map(item => (
                  <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                      >
                        <title>{item.name}</title>
                        <rect width="100%" height="100%" fill="#55595c" />
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                          {item.name}
                        </text>
                      </svg>
                      <div className="card-body">
                        <p className="card-text">
                          This rendered content from dynamic data.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Edit
                            </button>
                          </div>
                          <small className="text-muted">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default ItemDisplayComp;
