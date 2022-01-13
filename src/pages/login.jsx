import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../components/utils/constants";
import swal from "sweetalert";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      users: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "admin").then((res) => {
      const users = res.data;
      this.setState({ users });
    });
  }

  login = () => {
    const login = this.state.users.find(
      (data) => data.username === this.state.username && data.password === this.state.password
    );
    if (login === undefined) {
      swal({
        title: "username or password undefined",
        text: "silahkan coba lagi",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    } else {
      localStorage.setItem("admin", "loggedIn");
      window.location.href = "/";
    }
  }
  render() {
    const { username, password } = this.state;
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          marginTop: "15%",
          marginBottom: "15%",
        }}
      >
        <div className="form-container">
          <Row>
            <Col
              className="form-icon d-grid"
              style={{ placeItems: "center", width: "200px" }}
            >
              <FontAwesomeIcon
                className="text-center"
                icon={faUserCircle}
                style={{ fontSize: "200px" }}
              />
            </Col>
            <Col className="form-horizontal border">
              <h3 className="title">Login to Admin</h3>
              <div className="form-group">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  minLength="8"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="d-grid">
                <Button variant="dark" className="rounded-pill text-uppercase"
                  onClick={() => this.login()}>
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
