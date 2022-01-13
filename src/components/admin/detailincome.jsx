import React, { Component } from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export class detailincome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pesanans: [],
      items: [],
      data: {
        labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
          "September", "Oktober", "November", "Desember",],
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "blue",
          data: []
        }]
      },
      options: {
        plugins: {
          legend: {
            position: false,
          },
          scales: {
            yAxes: [{ ticks: { min: 6, max: 16 } }]
          }
        },

      }
    };
  }

  componentDidMount() {
    axios.get(API_URL + "products").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    axios.get(API_URL + "pesanans").then((res) => {
      const pesanans = res.data.filter((filtering) => filtering.bayar === true);
      const profit = [...Array(12)].map((e, i) => pesanans
        .filter((filtering) => filtering.bulan === i).map((pesanan) => pesanan.harga_total
        ).reduce(function (result, item) {
          return result + item;
        }, 0));
      this.setState({
        pesanans,
        data: {
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember",],
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "blue",
            data: profit
          }]
        }
      });
    });
  }

  render() {
    const { options, data, pesanans, items } = this.state
    return (
      <div className="container-fluid">
        <h1>Monthly Income</h1><hr />
        <Row>
          <Col>
            <h3><b>This Month:</b> Rp.{numberWithCommas(pesanans.filter((filtering) => filtering.bulan === new Date().getMonth())
              .reduce(function (result, item) {
                return result + item.harga_total;
              }, 0))}</h3><hr />
            <h3><b>This Year:</b> Rp.{numberWithCommas(pesanans.filter((filtering) => filtering.tahun === new Date().getFullYear())
              .reduce(function (result, item) {
                return result + item.harga_total;
              }, 0))}</h3><hr />
            <h3><b>Average / Month:</b> Rp.{numberWithCommas(Math.round(pesanans.filter((filtering) => filtering.tahun === new Date().getFullYear())
              .reduce(function (result, item) {
                return result + item.harga_total;
              }, 0) / 12))}</h3><hr />
          </Col>
          <Col className="col-9">
            <Line data={data} options={options} />
          </Col>
        </Row>
        <h1>Sold Items</h1><hr />
        <Table striped bordered hover className="text-center" variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Barang</th>
              <th>Harga</th>
              <th>Terjual</th>
              <th>Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>Rp. {numberWithCommas(item.harga)}</td>
                <td>waw</td>
                <td>@mdo</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default detailincome;
