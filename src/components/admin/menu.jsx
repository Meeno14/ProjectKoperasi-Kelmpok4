import React, { Component } from 'react'
import { Card, Table, Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faEdit, faMinusCircle, faPlusCircle, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";
import swal from "sweetalert";

export class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      harga: "",
      nama: "",
      category: "Snack",
      id: 0,
      show: false
    };
  }
  getProducts = () => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
  }
  componentDidMount() {
    this.getProducts()
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
  }

  handleClose = () => {
    this.setState({
      harga: "",
      nama: "",
      category: "Snack",
      id: 0,
      show: false
    })
  }
  edit = (product) => {
    this.setState({
      harga: product.harga,
      nama: product.nama,
      id: product.id,
      category: product.category,
      search: "",
      show: true
    })
  }
  delete = (item) => {
    axios
      .delete(API_URL + "products/" + item.id).then((res) => {
        this.getProducts()
        swal({
          title: "Deleting Menu",
          text: item.nama + " Was Deleted",
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
  }
  upload = () => {
    const payload = {
      nama: this.state.nama,
      harga: parseInt(this.state.harga),
      gambar: "Gak ada",
      category: this.state.category
    }
    if (this.state.id === 0) {
      axios
        .post(API_URL + "products", payload).then((res) => {
          this.getProducts()
          this.handleClose()
          swal({
            title: "Upload Succcessful",
            text: "Successfully Upload New Product",
            icon: "success",
            button: false,
            timer: 1500,
          });
        })
    } else {
      axios.put(API_URL + "products/" + this.state.id, payload).then((res) => {
        this.getProducts()
        this.handleClose()
        swal({
          title: "Update Succcessful",
          text: "Successfully Updated Product",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
    }
  }
  render() {
    const { products, search, categories, harga, nama, category } = this.state
    return (
      <Card className="mx-4">
        <Card.Header className="bg-dark text-light align-middle">
          <FontAwesomeIcon icon={faThList} /> Daftar Menu
          <Button className="btn-sm float-end text-light btn-dark2"
            onClick={() => this.setState({ show: true })}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Tambah
          </Button>
        </Card.Header>

        <Card.Body>
          <div className="float-end mb-3 d-flex">
            cari data:
            <input type="text" className="float-end form-control w-auto"
              style={{ padding: "0 10px" }} value={search} onChange={(e) => this.setState({ search: e.target.value })} />
          </div>
          <Table striped bordered hover className="text-center" variant="dark">
            <thead>
              <tr className="align-middle">
                <th>Action</th>
                <th>No</th>
                <th>Foto</th>
                <th>Nama Menu</th>
                <th>Kategori</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(item => item.nama.toLowerCase().includes(search)).map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "100px" }}>
                    <Button variant="secondary" className="btn-sm"
                      onClick={() => this.edit(item)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    <Button variant="secondary" className="btn-sm"
                      onClick={() => this.delete(item)}>
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                  </td>
                  <td>{index + 1}</td>
                  <td><img src={"Assets/" + item.category.toLowerCase() + "/" + item.gambar} className="w-50" /></td>
                  <td style={{ width: "130px" }}>{item.nama}</td>
                  <td>{item.category}</td>
                  <td style={{ width: "100px" }}>Rp. {numberWithCommas(item.harga)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body as={Form}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Menu</Form.Label>
              <Form.Control type="text" placeholder="Masukan Nama" value={nama}
                onChange={(e) => this.setState({ nama: e.target.value })} />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={(e) => this.setState({
                  category: e.target.value
                })}>
                  {categories.map((categori) => (
                    <option key={categori.id}>{categori.nama}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Harga</Form.Label>
                <Form.Control type="number" placeholder="Harga Produk" value={harga}
                  onChange={(e) => this.setState({ harga: e.target.value })} />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className="text-muted">
            <Button className="btn-dark2" onClick={() => this.upload()}>
              <FontAwesomeIcon icon={faSave} /> Update
            </Button>{" "}
            <Button variant="dark" onClick={() => this.handleClose()}>
              <FontAwesomeIcon icon={faWindowClose} /> Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card >
    )
  }
}

export default category
