import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIceCream,
  faCoffee,
  faPencilRuler,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faIceCream} className="mr-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama === "Peralatan")
    return <FontAwesomeIcon icon={faPencilRuler} className="mr-2" />;
  return <FontAwesomeIcon icon={faIceCream} className="mr-2" />;
};

export default class ListCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Navbar
          variant="dark"
          style={{ backgroundColor: "#212529" }}
          expand="lg"
        >
          <Container>
            <Navbar.Brand href="/">
              <strong>Koperasi</strong>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Category" id="basic-nav-dropdown">
                  {categories &&
                    categories.map((category) => (
                      <NavDropdown.Item
                        style={{ cursor: "pointer" }}
                        key={category.id}
                        href={"/categories#" + category.nama.toLowerCase()}
                      >
                        <Icon nama={category.nama} /> {category.nama}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              </Nav>
              <Nav.Link href="/keranjang">
                <FontAwesomeIcon icon={faShoppingCart} className="cart" />
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
