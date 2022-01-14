import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from "../utils/constants";
import { Button } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils'

export class step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keranjangs: [],
      pemesan: {},
    };
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
    const { pemesan, keranjangs } = this.state
    const totalHarga = this.state.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    const clear = {
      nama: "",
      catatan: ""
    }
    const today = new Date()
    const payload = {
      pemesan: pemesan.nama,
      absen: pemesan.absen,
      catatan: pemesan.catatan,
      harga_total: totalHarga,
      bayar: false,
      tanggal: today.getDate(),
      bulan: today.getMonth(),
      tahun: today.getFullYear(),
      items: keranjangs
    }
    axios.post(API_URL + "pesanans", payload).then((res) => {
      axios.put(API_URL + "pemesan", clear).then((res) => {
        this.state.keranjangs.map((keranjang) => (
          axios.delete(API_URL + "keranjangs/" + keranjang.id)
        ))
        this.props.handleNext()
      })
    })

  }

  render() {
    const totalHarga = this.state.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div>
        <h3>Order Detail</h3>
        <table className="w-100">
          <thead>
            <tr className=" border-top border-bottom order-list">
              <th>Menu</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.keranjangs.map((keranjang) => (
              <tr className="border-top border-bottom order-list" key={keranjang.id}>
                <td>{keranjang.product.nama} x {keranjang.jumlah}</td>
                <td>Rp. {numberWithCommas(keranjang.total_harga)}</td>
              </tr>
            ))}
            <tr className="border-top border-bottom order-list">
              <td><b>Total:</b></td>
              <td>Rp. {numberWithCommas(totalHarga)}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-3">Detail Pembeli</h3>
        <table className="w-100">
          <tbody>
            <tr className="border-top border-bottom order-list">
              <td><b>Nama:</b></td>
              <td>{this.state.pemesan.nama}</td>
            </tr>
            {/* <tr className="border-top border-bottom order-list">
              <td><b>No Absen:</b></td>
              <td>{this.state.pemesan.absen}</td>
            </tr> */}
            <tr className="border-top border-bottom order-list">
              <td><b>Catatan:</b></td>
              <td className="w-50">{this.state.pemesan.catatan}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <Button variant="dark" onClick={() => this.props.handleBack()}>Back</Button>
          <Button variant="dark" className="float-end"
            onClick={() => this.next()}>Next</Button>
        </div>
      </div>
    )
  }
}

export default step3
