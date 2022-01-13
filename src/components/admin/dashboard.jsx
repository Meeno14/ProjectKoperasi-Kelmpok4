import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { numberWithCommas } from "../utils/utils";

export class dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pesanans: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "products").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    axios.get(API_URL + "pesanans").then((res) => {
      const pesanans = res.data.filter((filtering) => filtering.bayar === true)
      this.setState({ pesanans });
    });
  }

  render() {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const blocks = [
      {
        value: this.state.items.length,
        name: "Produk",
        detail: "/detail-menu",
        icon: "pencil",
      },
      {
        value: "Rp. " + numberWithCommas(this.state.pesanans.filter((filtering) => filtering.bulan === new Date().getMonth())
          .reduce(function (result, item) {
            return result + item.harga_total;
          }, 0)),
        name:
          "Income " +
          monthNames[new Date().getMonth()] +
          " " +
          new Date().getFullYear(),
        detail: "/detail-income",
        icon: "coin",
      },
      {
        value: "Rp. " + this.state.pesanans.reduce(function (result, item) {
          return result + item.harga_total;
        }, 0),
        name: "Total",
        detail: "/detail-total",
        icon: "money",
      },
    ];

    return (
      <div className="container-fluid">
        <h4>Dashboard</h4>
        <Row>
          {blocks.map((block, index) => (
            <Col key={index}>
              <Card
                bg="dark"
                text="white"
                className={"rounded-3 icon-back " + block.icon}
              >
                <Card.Body>
                  <h5 className="fw-normal">{numberWithCommas(block.value)}</h5>
                  <span className="fw-normal">{block.name}</span>
                </Card.Body>
                <Card.Footer d="flex" style={{ cursor: "pointer" }}>
                  <a href={block.detail} className="nav-link fw-normal">
                    View Details
                    <span>
                      <FontAwesomeIcon
                        align="middle"
                        className="ms-2"
                        icon={faAngleRight}
                      />
                    </span>
                  </a>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default dashboard;
