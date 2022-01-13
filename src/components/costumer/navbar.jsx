import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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

  toCategory = (category) => {
    localStorage.setItem("choosedCategory", category)
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Navbar
          variant="dark"
          bg="dark"
          className="fixed-top"
        >
          <Container>
            <Navbar.Brand href="/" className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold">
              {this.props.title}
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
                        href="/categories"
                        onClick={() => this.toCategory(category.nama)}
                      >
                        <i className={"fas fa-" + category.icon} /> {category.nama}
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
