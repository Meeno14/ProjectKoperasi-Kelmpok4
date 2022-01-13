import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from "../utils/constants";
import { numberWithCommas } from '../utils/utils'

export class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keranjangs: [],
      pemesan: {},
    }
  }

  getKeranjangs = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    });
  }
  componentDidMount() {
    this.getKeranjangs()
    axios.get(API_URL + "pemesan").then((res) => {
      const pemesan = res.data;
      this.setState({ pemesan });
    });
  }

  next = () => {
    const payload = {
      nama: this.state.pemesan.nama,
      // absen: this.state.pemesan.absen,
      catatan: this.state.pemesan.catatan
    }
    axios.put(API_URL + "pemesan", payload).then((res) => {
      this.props.handleNext()
    });
  }

  render() {
    const totalJumlah = this.state.keranjangs.reduce(function (result, item) {
      return parseInt(result) + parseInt(item.jumlah);
    }, 0);
    const totalHarga = this.state.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div>
        <Row>
          <Col className="col-8">
            <h3>Detail Pemesanan</h3>
            <hr className="w-25 mt-0" />
            <Form>
              {/* <Row>
                <Col> */}
              <h5>Nama Siswa:</h5>
              <input
                placeholder='Masukan nama sesuai data sekolah'
                value={this.state.pemesan.nama}
                type="text"
                className="form-control"
                onChange={(e) => this.setState(prevState => {
                  let pemesan = Object.assign({}, prevState.pemesan);
                  pemesan.nama = e.target.value;
                  return { pemesan };
                })}
              />
              {/* </Col>
                <Col>
                  <h5>No Absen:</h5>
                  <select className="form-control" value={this.state.pemesan.absen}
                    onChange={(e) => this.setState(
                      prevState => {
                        let pemesan = Object.assign({}, prevState.pemesan);
                        pemesan.absen = e.target.value;
                        return { pemesan };
                      }
                    )} >
                    {[...Array(32)].map((e, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row> */}
              <h3 className="mt-3">Informasi Tambahan</h3>
              <hr className="w-25 mt-0" />
              <h5>Catatan</h5>
              <textarea
                placeholder='Contoh catatan: "Pensil warna merah, Bolu rasa coklat, Froot Tea rasa anggur..."'
                className="form-control"
                value={this.state.pemesan.catatan}
                onChange={(e) => this.setState(prevState => {
                  let pemesan = Object.assign({}, prevState.pemesan);
                  pemesan.catatan = e.target.value;
                  return { pemesan };
                }
                )}
              ></textarea>
            </Form>
          </Col>
          <Col className="col-4">
            <h3>Order Anda</h3>
            <hr className="w-25 mt-0" />
            <div className="shadow p-4 border rounded">
              <h6 className="float-start">Menu</h6>
              <h6 className="float-end">Total</h6>
              <br />
              <hr />
              {this.state.keranjangs.map((keranjang) => (
                <p key={keranjang.id} className="d-inline">
                  <b>×{keranjang.jumlah} </b>
                  <span>{keranjang.product.nama}</span>
                  <span className="float-end">Rp. {numberWithCommas(keranjang.total_harga)}</span>
                  <br />
                </p>
              ))}
              <hr />
              <h6 className="float-start">
                <b>Total Qty</b>
              </h6>
              <h6 className="float-end">{totalJumlah}</h6>
              <br />
              <hr />
              <h6 className="float-start">
                <b>Total Bayar</b>
              </h6>
              <h6 className="float-end">Rp. {numberWithCommas(totalHarga)}</h6>
              <br />
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <Button variant="dark" onClick={() => this.props.handleBack()}>Back</Button>
          <Button variant="dark" className="float-end"
            onClick={() => this.next()} disabled={
              this.state.pemesan.nama === ""
            }>Next</Button>
        </div>
      </div>
    )
  }
}

export default step2
