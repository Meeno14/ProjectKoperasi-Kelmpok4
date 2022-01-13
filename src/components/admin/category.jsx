import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faEdit, faMinusCircle, faPlusCircle, faWindowClose, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { icons } from "../utils/icons";
import swal from "sweetalert";

export class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categorih: "",
      choosedIcon: "",
      searchbar: "",
      id: 0,
      show: false,
      dropdown: false,
    };
  }
  getCategories = () => {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
  }
  componentDidMount() {
    this.getCategories()
  }

  collapse = () => {
    if (this.state.dropdown) {
      this.setState({ dropdown: false });
    } else {
      this.setState({ dropdown: true });
    }
  };
  handleClose = () => {
    this.setState({
      categorih: "",
      choosedIcon: "",
      searchbar: "",
      id: 0,
      show: false,
      dropdown: false,
    })
  }

  upload = () => {
    const payload = {
      nama: this.state.categorih,
      icon: "fas fa-" + this.state.choosedIcon,
    }
    if (this.state.id === 0) {
      axios.post(API_URL + "categories", payload).then((res) => {
        this.getCategories()
        this.handleClose()
      })
    } else {
      axios.put(API_URL + "categories/" + this.state.id, payload).then((res) => {
        this.getCategories()
        this.handleClose()
      })
    }
  }
  edit = (categori) => {
    this.setState({
      categorih: categori.nama,
      choosedIcon: categori.icon,
      id: categori.id,
      show: true,
    })
  }
  delete = (categori) => {
    axios.get(API_URL + "products?category=" + categori.nama).then((res) => {
      res.data.map((category) => (
        axios.delete(API_URL + "products/" + category.id)
      ))
    })
    axios.delete(API_URL + "categories/" + categori.id).then((res) => {
      this.getCategories()
      swal({
        title: "Deleting Category",
        text: categori.nama + " Was Deleted",
        icon: "error",
        button: false,
        timer: 1500,
      });
    })
  }
  render() {
    const { choosedIcon, searchbar, show, categorih, categories } = this.state
    const filteredData = icons.filter(item => item.toLowerCase().includes(searchbar));

    return (
      <Card className="mx-4">
        <Card.Header className="bg-dark text-light align-middle">
          <FontAwesomeIcon icon={faThList} /> Daftar Kategori
          <Button className="btn-sm float-end text-light btn-dark2"
            onClick={() => this.setState({ show: true })}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Tambah
          </Button>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover className="text-center" variant="dark">
            <thead>
              <tr className="align-middle">
                <th>Action</th>
                <th>No</th>
                <th>Kategory</th>
                <th>Icon</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((categori, index) => (
                <tr key={index}>
                  <td style={{ width: "100px" }}>
                    <Button variant="secondary" className="btn-sm" onClick={() => this.edit(categori)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    <Button variant="secondary" className="btn-sm" onClick={() => this.delete(categori)}>
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                  </td>
                  <td>{index + 1}</td>
                  <td>{categori.nama}</td>
                  <td><i className={"fas fa-" + categori.icon} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Modal show={show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Carousel</Modal.Title>
          </Modal.Header>
          <Modal.Body as={Form}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control type="text" placeholder="Nama Untuk Kategori" value={categorih}
                onChange={(e) => this.setState({ categorih: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Icon Kategori</Form.Label>
              <Button variant="secondary" className="form-control text-start bg-light text-dark"
                onClick={() => this.collapse()}>
                <i className={"fas fa-" + choosedIcon} />
              </Button>
              <div className={"border-secondary " + (!this.state.dropdown && "collapse")} >
                <Form.Control type="text" placeholder="Search for Icon" value={searchbar}
                  onChange={(e) => this.setState({ searchbar: e.target.value })} />
                <Row className="border-secondary py-3 px-3" style={{ fontSize: "30px" }}>
                  {filteredData.slice(0, 24).map((icon, index) => (
                    <Col key={index} onClick={() => this.setState({ choosedIcon: icon })}>
                      <i className={"fas fa-" + icon} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Form.Group>
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
      </Card >
    )
  }
}

export default category
