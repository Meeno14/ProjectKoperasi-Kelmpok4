import React, { Component } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

export default class setting extends Component {
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

  upload = () => {
    const web_profile = this.state.web_profile;
    axios.put(API_URL + "web_profile/1", web_profile).then((res) => {
      swal({
        title: "Update Succcessful",
        text: "Successfully Updated Web Profile",
        icon: "success",
        button: false,
        timer: 1500,
      });
    })
  };
  render() {
    const web_profile = this.state.web_profile;
    return (
      <Card className="mx-4">
        <Card.Header className="text-light bg-dark">
          <FontAwesomeIcon icon={faEdit} />{" "}
          <strong>Detail Kontak Kami</strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="2">
                Email Address
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={web_profile.email}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.email = e.target.value;
                      return { web_profile };
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="2">
                Phone Number
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={web_profile.number}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.number = e.target.value;
                      return { web_profile };
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={web_profile.address}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.address = e.target.value;
                      return { web_profile };
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2 fgs">
              <Form.Label column sm="2">
                Website
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={web_profile.website}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.website = e.target.value;
                      return { web_profile };
                    })
                  }
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="dark" onClick={() => this.upload()}>
            <FontAwesomeIcon icon={faCloudUploadAlt} /> Update
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}
