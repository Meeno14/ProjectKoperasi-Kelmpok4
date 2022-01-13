import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";
import Categories from "../components/costumer/category";
import { API_URL } from "../components/utils/constants";

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
    };
  }
  componentDidMount() {
    axios.get(API_URL + "products").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    const categoryName = localStorage.getItem("choosedCategory");
    axios.get(API_URL + "categories?nama=" + categoryName).then((res) => {
      const categories = res.data;
      this.setState({ categories });
    });
  }

  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const payload = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
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
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
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
  itemDetail = (product) => {
    const payload = {
      item_id: product.id,
      nama: product.nama,
      harga: product.harga,
      gambar: product.gambar,
      category: product.category,
    };
    axios.get(API_URL + "details").then((res) =>
      axios.put(API_URL + "details/" + res.data[0].id, payload).then((res) => {
        window.location.href = "/details";
      })
    );
  };
  render() {
    const { items, categories } = this.state;
    return (
      <div>
        <Categories
          itemDetail={this.itemDetail}
          masukKeranjang={this.masukKeranjang}
          items={items}
          categories={categories}
        />
      </div>
    );
  }
}

export default home;
