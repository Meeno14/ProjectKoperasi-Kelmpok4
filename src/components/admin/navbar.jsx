import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from "axios";
import { API_URL } from "../utils/constants";

export class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web_profile: {},
    };
  }

  componentDidMount() {
    axios.get(API_URL + "web_profile").then((res) => {
      const web_profile = res.data[0];
      this.setState({ web_profile });
    });
  }

  logout = () => {
    localStorage.setItem("admin", "loggedOut");
    window.location.href = "/";
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="offcanvasExample"
          >
            <span
              className="navbar-toggler-icon"
              data-bs-target="#sidebar"
            ></span>
          </button>
          <a
            className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
            href="/#"
          >
            {this.state.web_profile.name}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#topNavBar"
            aria-controls="topNavBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex ms-auto my-3 my-lg-0">
            <Button variant="dark" className="float-end btn-outline-light"
              onClick={() => this.logout()}>
              Logout</Button>
          </div>

        </div>
      </nav>
    )
  }
}

export default navbar
