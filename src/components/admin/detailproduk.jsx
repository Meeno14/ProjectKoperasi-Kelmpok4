import React, { Component } from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constants";

export class detailmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      choose: "Snack",
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category=" + this.state.choose)
      .then((res) => {
        const items = res.data;
        this.setState({ items });
      });
    axios.get(API_URL + "categories").then((res) => {
      const categories = res.data;
      this.setState({ categories });
    });
  }

  changeCategory = (value) => {
    this.setState({ choose: value, menus: [] });
    axios.get(API_URL + "products?category=" + value).then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  };

  render() {
    const { items, categories, choose } = this.state;
    return (
      <div className="container-fluid">
        <h1>Detail Menu</h1>
        <Row>
          <Col className="col-10">
            <Row>
              {items &&
                items.map((item) => (
                  <Col key={item.id} md={3} xs={4} style={{ padding: "0" }}>
                    <Card className="shadow my-2 item text-center">
                      <div>
                        <Card.Img
                          className="images"
                          variant="top"
                          src={
                            "Assets/" +
                            item.category.toLowerCase() +
                            "/" +
                            item.gambar
                          }
                        />
                        <Card.Body>
                          <Card.Title>{item.nama}</Card.Title>
                          <hr style={{ margin: "0" }} />
                          <b>Harga:</b>
                          <Card.Text>
                            Rp. {numberWithCommas(item.harga)}
                          </Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => this.changeCategory(category.nama)}
                  className={category.nama === choose && "bg-dark text-light"}
                >
                  <span
                    style={{ fontSize: "20px" }}
                    className={category.nama === choose && "opacity-75"}
                  >
                    <i className={"fas fa-" + category.icon} /> {category.nama}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <a
              href="/menu"
              className="mt-4 shadow bg-dark text-light text-center nav-link"
              style={{ border: "dashed 3px #f8f9fa" }}
            >
              <span style={{ fontSize: "24px" }}>
                Tambah
                <br />
                Menu +
              </span>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default detailmenu;
