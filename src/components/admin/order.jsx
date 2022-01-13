import React, { Component } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pesanans: [],
    };
  }
  componentDidMount() {
    axios.get(API_URL + "pesanans").then((res) => {
      const pesanans = res.data.reverse();
      this.setState({ pesanans });
    })
  }

  batal = (index, id) => {
    const newArr = this.state.pesanans.slice();
    newArr[index].bayar = false;
    this.setState({ pesanans: newArr });
    axios.put(API_URL + "pesanans/" + id, newArr[index]);
  }
  konfirmasi = (index, id) => {
    const newArr = this.state.pesanans.slice();
    newArr[index].bayar = true;
    this.setState({ pesanans: newArr });
    axios.put(API_URL + "pesanans/" + id, newArr[index]);
  }

  render() {
    return (
      <Card className="mx-4">
        <Card.Header className="bg-dark text-light">Daftar Order</Card.Header>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>No</th>
                <th>Order No</th>
                <th>Tanggal</th>
                <th>Nama Pembeli</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Konfirm</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pesanans.map((pesanan, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pesanan.id}</td>
                  <td>
                    {("0" + pesanan.tanggal).slice(-2) + "-" +
                      ("0" + (pesanan.bulan + 1)).slice(-2) + "-" + pesanan.tahun}
                  </td>
                  <td>{pesanan.pemesan}</td>
                  <td>{pesanan.items.reduce(function (result, item) {
                    return result + parseInt(item.jumlah);
                  }, 0)}</td>
                  <td>Rp. {numberWithCommas(pesanan.harga_total)}</td>
                  <td>
                    {pesanan.bayar === true ? "Sudah " : "Belum "}Bayar
                  </td>
                  <td>
                    {pesanan.bayar === true ? (
                      <Button variant="secondary" className="btn-sm" onClick={() => this.batal(index, pesanan.id)}>
                        Batal
                      </Button>
                    ) : (
                      <Button variant="secondary" className="btn-sm" onClick={() => this.konfirmasi(index, pesanan.id)}>
                        Konfirmasi
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
