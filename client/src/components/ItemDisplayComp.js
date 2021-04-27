import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ItemDisplayComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let self = this;
    axios
      .get("api/items")
      .then(function(response) {
        self.setState({ items: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const items = this.state.items;
    //console.log(items);
    return (
      <div>
        <main role="main">
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {items.map(item => (
                  <div className="col-md-4" key={item._id}>
                    <div className="card mb-4 shadow-sm">
                      <a
                        href={"/#/viewItem/" + item._id + "/#"}
                        className="card-img-top-new"
                      >
                        <img src={item.imageLocation} className="card-img-top-new"/>
                      </a>
                      <div className="card-body">
                        <h5>{item.name}</h5>
                        <br />
                        <p className="card-text">
                          {item.description}
                          <br />
                          {item.price}
                          <br />
                          {item.owner.name}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <a href={"/#/viewItem/"+item._id}
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View
                            </a>
                            {/*<a href={"/#/editItem/"+item._id}
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Edit
                            </a>*/}
                          </div>
                          {/*<small className="text-muted">9 mins</small>*/}
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
