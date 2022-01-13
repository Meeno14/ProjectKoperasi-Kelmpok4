import React, { Component } from 'react'
import swal from "sweetalert";
import { Button } from "react-bootstrap"
import axios from 'axios'
import { API_URL } from "../utils/constants";
import { numberWithCommas } from '../utils/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keranjangs: [],
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
  }
  remove = (keranjang) => {
    axios.delete(API_URL + "keranjangs/" + keranjang.id).then((res) => {
      this.getKeranjangs()
      swal({
        title: keranjang.product.nama + " Telah di Hapus",
        text: "Berhasil Mengahapus " + keranjang.product.nama + " Dari Keranjang",
        icon: "error",
        button: false,
        timer: 1000,
      });
    })
  }

  kurang = (index) => {
    const newArr = this.state.keranjangs.slice()
    if (newArr[index].jumlah > 1) {
      newArr[index].jumlah = newArr[index].jumlah - 1
      newArr[index].total_harga = parseInt(newArr[index].jumlah)
        * newArr[index].product.harga;
      this.setState({ keranjangs: newArr });
    } else {
      swal({
        title: "Beli Debih Dari 0",
        text: "Jumlah Barang Tidak Bisa Kurang Dari 1",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  };
  tambah = (index) => {
    const newArr = this.state.keranjangs.slice()
    newArr[index].jumlah = parseInt(newArr[index].jumlah) + 1;
    newArr[index].total_harga = parseInt(newArr[index].jumlah)
      * newArr[index].product.harga
    this.setState({ keranjangs: newArr });
  };
  handleChange = (e, index) => {
    const newArr = this.state.keranjangs.slice()
    if (e.target.value > 0) {
      newArr[index].jumlah = e.target.value;
      newArr[index].total_harga = parseInt(newArr[index].jumlah)
        * newArr[index].product.harga
      this.setState({ keranjangs: newArr })
    } else {
      swal({
        title: "Beli Debih Dari 0",
        text: "Jumlah Barang Tidak Bisa Kurang Dari 1",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  }

  next = () => {
    this.state.keranjangs.map(function (item) {
      return axios.put(API_URL + "keranjangs/" + item.id, item);
    });
    this.props.handleNext()
  }

  render() {
    return (
      <div>
        <table className="w-100 text-center">
          <thead>
            <tr>
              <th>{this.props.activeStep}</th>
              <th className="text-start">Menu</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.keranjangs.map((keranjang, index) => (
              <tr className="border-top border-bottom" key={keranjang.id}>
                <td style={{ width: "3%" }}>
                  <Button variant="dark" className="mx-4 btn-sm"
                    onClick={() => this.remove(keranjang)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </td>
                <td className="w-25">
                  <img
                    alt=""
                    src={
                      "Assets/" +
                      keranjang.product.category.toLowerCase() +
                      "/" +
                      keranjang.product.gambar
                    }
                    className="w-50 my-4"
                  /> {keranjang.product.nama}
                </td>
                <td>Rp. {numberWithCommas(keranjang.product.harga)}</td>
                <td>
                  <Button
                    className="btn-sm"
                    variant="dark"
                    onClick={() => this.kurang(index)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <input
                    className="rounded border text-center jumlah mx-1"
                    type="number"
                    value={keranjang.jumlah}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                  <Button
                    className="btn-sm"
                    variant="dark"
                    onClick={() => this.tambah(index)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </td>
                <td>Rp. {numberWithCommas(keranjang.total_harga)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Button variant="dark" onClick={() => window.location.href = "/"}>Back</Button>
          <Button variant="dark" className="float-end"
            onClick={() => this.next()}>Next</Button>
        </div>
      </div>
    )
  }
}

export default step1
