import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../components/utils/utils";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../components/utils/constants";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

export class details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      jumlah: 1,
    };
  }
  componentDidMount() {
    axios.get(API_URL + "details").then((res) => {
      const details = res.data;
      this.setState({ details });
    });
  }
  handleChange = (e) => {
    if (e.target.value > 0) {
      this.setState({ jumlah: e.target.value });
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
  tambah = () => {
    this.setState({
      jumlah: parseInt(this.state.jumlah) + 1,
    });
  };
  kurang = (barang) => {
    if (this.state.jumlah > 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
      });
    } else {
      swal({
        title: "Beli Debih Dari 0",
        text: "Jumlah " + barang + " Tidak Bisa Kurang Dari 1",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  };
  masukKeranjang = (product) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + product.item_id)
      .then((res) => {
        if (res.data.length === 0) {
          const payload = {
            jumlah: this.state.jumlah,
            total_harga: product.harga * this.state.jumlah,
            product: {
              id: product.item_id,
              nama: product.nama,
              harga: product.harga,
              gambar: product.gambar,
              category: product.category,
            },
          };
          axios.post(API_URL + "keranjangs", payload).then((res) => {
            swal({
              title: "Sukses Masuk Keranjang",
              text: "Sukses Masuk Keranjang " + payload.product.nama,
              icon: "success",
              button: false,
              timer: 1500,
            });
          });
        } else {
          const payload = {
            jumlah: res.data[0].jumlah + this.state.jumlah,
            total_harga:
              res.data[0].total_harga + product.harga * this.state.jumlah,
            product: {
              id: product.item_id,
              nama: product.nama,
              harga: product.harga,
              gambar: product.gambar,
              category: product.category,
            },
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, payload)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + payload.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            });
        }
      });
  };
  render() {
    const details = this.state.details;
    const jumlah = this.state.jumlah;
    return (
      <div>
        {details &&
          details.map((detail) => (
            <Row className="my-3" key={detail.id}>
              <Col className="col-md-8">
                <img
                  src={
                    "Assets/" +
                    detail.category.toLowerCase() +
                    "/" +
                    detail.gambar
                  }
                  alt="."
                  className="images"
                />
              </Col>
              <Col className="col-6 col-md-4">
                <h2>{detail.nama}</h2>
                <h4>(Rp. {numberWithCommas(detail.harga)})</h4>
                <hr />
                <Button
                  className="btn-sm"
                  variant="dark"
                  onClick={() => this.kurang(detail.nama)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <input
                  className="rounded border text-center jumlah mx-1"
                  type="number"
                  value={jumlah}
                  onChange={this.handleChange}
                />
                <Button className="btn-sm" variant="dark" onClick={this.tambah}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <h4>
                  Total Harga: Rp. {numberWithCommas(detail.harga * jumlah)}
                </h4>
                <Button
                  onClick={() => this.masukKeranjang(detail)}
                  className="btn-lg"
                  variant="dark"
                >
                  <b>Order</b>
                </Button>
              </Col>
            </Row>
          ))}
      </div>
    );
  }
}

export default details;
