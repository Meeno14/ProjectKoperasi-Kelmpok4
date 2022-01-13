import React, { Component } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
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
    const { web_profile } = this.state;
    return (
      <Card className="mx-4">
        <Card.Header className="bg-dark text-light">
          <FontAwesomeIcon icon={faCogs} /> <strong>Setting App</strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3 fgs"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Nama Toko
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={web_profile.name}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.name = e.target.value;
                      return { web_profile };
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Deskripsi
              </Form.Label>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={web_profile.description}
                  onChange={(e) =>
                    this.setState((prevState) => {
                      let web_profile = Object.assign(
                        {},
                        prevState.web_profile
                      );
                      web_profile.description = e.target.value;
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
