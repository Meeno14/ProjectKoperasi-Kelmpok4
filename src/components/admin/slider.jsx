import React, { Component } from "react";
import { Card, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThList,
  faSave,
  faEdit,
  faMinusCircle,
  faPlusCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

export class slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: [],
      categories: [],
      items: [],
      category: "snack",
      image: "permen.jpg",
      id: 0,
      show: false
    };
  }

  getCarousel = () => {
    axios.get(API_URL + "carousel").then((res) => {
      const carousel = res.data;
      this.setState({ carousel });
    });
  }
  componentDidMount() {
    this.getCarousel()
    axios.get(API_URL + "categories").then((res) => {
      const categories = res.data;
      this.setState({ categories });
    });
    axios.get(API_URL + "products").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }

  handleClose = () => {
    this.setState({
      category: "snack",
      image: "permen.jpg",
      id: 0,
      show: false
    })
  }

  upload = () => {
    const payload = {
      category: this.state.category,
      image: this.state.image
    }
    if (this.state.id === 0) {
      axios.post(API_URL + "carousel", payload).then((res) => {
        this.getCarousel()
        this.handleClose()
        swal({
          title: "Upload Succcessful",
          text: "Successfully Upload New Slider",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
    } else {
      axios.put(API_URL + "carousel/" + this.state.id, payload).then((res) => {
        this.getCarousel()
        this.handleClose()
        swal({
          title: "Update Succcessful",
          text: "Successfully Updated Slider",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
    }
  }
  delete = (image) => {
    axios.delete(API_URL + "carousel/" + image.id).then((res) => {
      this.getCarousel()
      swal({
        title: "Deleting Image",
        text: image.image + " Was Deleted",
        icon: "error",
        button: false,
        timer: 1500,
      });
    })
  }
  edit = (image) => {
    this.setState({
      category: image.category,
      image: image.image,
      id: image.id,
      show: true
    })
  }
  render() {
    const { carousel, categories, items, category, image } = this.state
    return (
      <Card className="mx-4">
        <Card.Header className="bg-dark text-light align-middle">
          <FontAwesomeIcon icon={faThList} /> Daftar Slider
          <Button className="btn-sm float-end text-light btn-dark2"
            onClick={() => this.setState({ show: true })}>
            <FontAwesomeIcon icon={faPlusCircle} /> Tambah
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover className="text-center" variant="dark">
            <thead>
              <tr>
                <th>Action</th>
                <th>No</th>
                <th>Barang</th>
              </tr>
            </thead>
            <tbody>
              {carousel.map((image, index) => (
                <tr key={index}>
                  <td style={{ width: "100px" }}>
                    <Button variant="secondary" onClick={() => this.edit(image)} className="btn-sm">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    <Button variant="secondary" onClick={() => this.delete(image)} className="btn-sm">
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <img className="w-50" src={"Assets/" + image.category + "/" + image.image} alt="." />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal size="lg" show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Carousel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col as={Form}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image Category</Form.Label>
                    <Form.Select value={category} onChange={(e) =>
                      this.setState({ category: e.target.value })}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.nama.toLowerCase()}>{category.nama}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Select value={image}
                      onChange={(e) => this.setState({ image: e.target.value })}>
                      {items.filter((filtering) =>
                        filtering.category.toLowerCase() === category)
                        .map((item) => (
                          <option key={item.id} value={item.gambar}>
                            {item.gambar}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <img src={"Assets/" + category + "/" + image} width="100%" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-dark2" onClick={() => this.handleClose()}>
                <FontAwesomeIcon icon={faWindowClose} /> Cancel
              </Button>
              <Button variant="dark" onClick={() => this.upload()}>
                <FontAwesomeIcon icon={faSave} /> Update
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>

      </Card>
    );
  }
}

export default slider;
